import { LoginFormSchema, ProductFormValidation, SignupFormSchema } from "@/lib/ValidationSchema"

export const productValidation = async (formData: FormData) => {
    const formDataObject: Record<string, unknown> = {}

    formData.forEach((value, key) => {
        formDataObject[key] = value
    })

    const validationResult = ProductFormValidation.safeParse(formDataObject)

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
}

export const signupValidation = async (formData: FormData) => {
    const formDataObject: Record<string, unknown> = {}

    formData.forEach((value, key) => {
        formDataObject[key] = value
    })

    const validationResult = SignupFormSchema.safeParse(formDataObject)

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
}

export const loginValidation = async (formData: FormData) => {
    const formDataObject: Record<string, unknown> = {}

    formData.forEach((value, key) => {
        formDataObject[key] = value
    })

    const validationResult = LoginFormSchema.safeParse(formDataObject)

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
}