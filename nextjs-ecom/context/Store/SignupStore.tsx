import { SignupFormError } from "@/lib/ValidationSchema"
import { create } from "zustand"

type SignupStore = {
    name: string
    email: string
    password: string
    errors: Partial<Record<keyof SignupFormError, string[]>>,
    setName: (value: string) => void
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setErrors: (value: Partial<Record<keyof SignupFormError, string[]>>) => void
    resetForm: () => void
}

export const useSignupStore = create<SignupStore>((set) => ({
    name: '',
    email: '',
    password: '',
    errors: {},
    setName: (value) => set({ name: value }),
    setEmail: (value) => set({ email: value }),
    setPassword: (value) => set({ password: value }),
    setErrors: (value) => set({ errors: value }),
    resetForm: () => set({
        name: '',
        email: '',
        password: '',
        errors: {},
    })
}))