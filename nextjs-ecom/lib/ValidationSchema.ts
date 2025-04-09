import { z } from "zod";

// product validation
export const ProductFormValidation = z.object({
    name: z.string().min(2, { message: "Product name is required" }),
    price: z.coerce.number().min(1, { message: "Product base price is required" }),
    tax_class: z.string().min(2, { message: "Product tax class is required" }),
    sku_number: z.string().min(2, { message: "SKU is required" }),
    barcode_number: z.string().min(2, { message: "Product barcode is required" }),
    on_shelf: z.coerce.string().refine((value) => Number(value) > 0, { message: "Shelf quantity must be greater than zero" }),
})

export type ProductFormError = {
    [Key in keyof z.infer<typeof ProductFormValidation>]?: string[]
}

// signup validation
export const SignupFormSchema = z.object({
    full_name: z.string().min(2, { message: 'Name must be atleast 2 characters long' }).trim(),
    email: z.string().email({ message: 'Please enter valid email' }),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

export type SignupFormError = {
    [Key in keyof z.infer<typeof SignupFormSchema>]?: string[]
}

// login validation
export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter valid email' }),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

export type LoginFormError = {
    [Key in keyof z.infer<typeof LoginFormSchema>]?: string[]
}