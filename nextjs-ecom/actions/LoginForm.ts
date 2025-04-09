import Swal from "sweetalert2"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useLoginStore } from "@/context/Store/LoginStore"
import { loginValidation } from "./Validation"
import { LoginResponse } from "@/interface/loginResponse"

export const LoginFormAction = () => {

    const { email, password, setErrors, resetForm } = useLoginStore()

    const queryClient = useQueryClient()
    const router = useRouter()

    const loginFormMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const endPoint = 'http://localhost:8004/login'
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
        onSuccess: (result: LoginResponse) => {
            console.log(`message: ${result.message}, data: ${result.data.token}`)

            if (result.data.token) {
                localStorage.setItem("token", result.data.token)
            }

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
                router.push('/products')
            });
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
        }
    })

    const handleLoginForm = async () => {
        const formData = new FormData()

        formData.append("email", email)
        formData.append("password", password)

        console.log(`///////////// login formdata: email: ${formData.get('email')}, pass: ${formData.get('password')}`,)

        // validation
        const validation = await loginValidation(formData)
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

        loginFormMutation.mutate(formData)
    }

    return {
        handleLoginForm,
        loading: loginFormMutation.isPending,
    }
}