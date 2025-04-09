import { useSignupStore } from "@/context/Store/SignupStore"
import { signupValidation } from "./Validation"
import Swal from "sweetalert2"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const SignupFormAction = () => {

    const { name, email, password, setErrors, resetForm } = useSignupStore()

    const queryClient = useQueryClient()
    const router = useRouter()

    const signupFormMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const endPoint = 'http://localhost:8004/account'
            const method = "POST"
            const response = await fetch(endPoint, {
                method,
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(`${data.error}`)
            }

            return data
        },
        onSuccess: (result) => {
            console.log(`message: ${result.message}, data: ${result.data}`)
            queryClient.invalidateQueries({ queryKey: ['product'] })

            Swal.fire({
                html: `
                <div style="font-size:15px">
                You have successfully registered
                </div>
                `,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                resetForm()
                router.push('/users/login')
            });
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
        }
    })

    const handleSignupForm = async () => {
        const formData = new FormData()

        formData.append("full_name", name)
        formData.append("email", email)
        formData.append("role", 'admin')
        formData.append("password", password)

        console.log(`///////////// signup formdata: name: ${formData.get('full_name')} email: ${formData.get('email')}, pass: ${formData.get('password')}, role: ${formData.get('role')}`,)

        // validation
        const validation = await signupValidation(formData)
        if (validation?.errors) {
            setErrors(validation.errors)
            Swal.fire({
                html: `
                        <div style="font-size:15px">
                        Sorry, looks like there are some errors detected, please try again.
                        </div>
                        `,
                icon: "error",
                confirmButtonText: "Ok, got it!",
                confirmButtonColor: "#008000",
            });
        }

        signupFormMutation.mutate(formData)
    }

    return {
        handleSignupForm,
        loading: signupFormMutation.isPending,
    }
}