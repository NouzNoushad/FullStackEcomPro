import { LoginFormError } from "@/lib/ValidationSchema"
import { create } from "zustand"

type LoginStore = {
    email: string
    password: string
    errors: Partial<Record<keyof LoginFormError, string[]>>,
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setErrors: (value: Partial<Record<keyof LoginFormError, string[]>>) => void
    resetForm: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
    email: '',
    password: '',
    errors: {},
    setEmail: (value) => set({ email: value }),
    setPassword: (value) => set({ password: value }),
    setErrors: (value) => set({ errors: value }),
    resetForm: () => set({
        email: '',
        password: '',
        errors: {},
    })
}))