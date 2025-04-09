import { DiscountType } from "@/lib/Constants"
import { ProductFormError } from "@/lib/ValidationSchema"
import { create } from "zustand"

type GlobalStore = {
    selectedFile: File | null
    imagePreview: string | null
    selectedStatus: string
    selectedCategory: string
    selectedTag: string
    selectedTemplate: string
    selectedName: string
    selectedDescription: string
    imageFiles: File[]
    imagePreviews: string[]
    selectedPrice: string
    discountType: DiscountType
    selectedTaxClass: string
    selectedVATAmount: string
    selectedSKUNumber: string
    selectedBarcodeNumber: string
    selectedOnShelf: string
    selectedInWarehouse: string
    isBackorder: boolean
    variationColor: string
    variationSize: string
    variationMaterial: string
    variationStyle: string
    isPhysical: boolean
    selectedMetaTitle: string,
    selectedMetaDescription: string,
    selectedMetaKeywords: string,
    errors: Partial<Record<keyof ProductFormError, string[]>>,
    setSelectedFile: (value: File) => void
    setImagePreview: (value: string) => void
    setSelectedStatus: (value: string) => void
    setSelectedTag: (value: string) => void
    setSelectedCategory: (value: string) => void
    setSelectedTemplate: (value: string) => void
    setSelectedName: (value: string) => void
    setSelectedDescription: (value: string) => void
    setImageFiles: (file: File) => void
    setImagePreviews: (value: string) => void
    removeFiles: (index: number) => void
    setSelectedPrice: (value: string) => void
    setDiscountType: (value: DiscountType) => void
    setSelectedTaxClass: (value: string) => void
    setSelectedVATAmount: (value: string) => void
    setSelectedSKUNumber: (value: string) => void
    setSelectedBarcodeNumber: (value: string) => void
    setSelectedOnShelf: (value: string) => void
    setSelectedInWarehouse: (value: string) => void
    setIsBackorder: (value: boolean) => void
    setVariationColor: (value: string) => void
    setVariationSize: (value: string) => void
    setVariationMaterial: (value: string) => void
    setVariationStyle: (value: string) => void
    setIsPhysical: (value: boolean) => void
    setSelectedMetaTitle: (value: string) => void
    setSelectedMetaDescription: (value: string) => void
    setSelectedMetaKeywords: (value: string) => void
    setErrors: (value: Partial<Record<keyof ProductFormError, string[]>>) => void
    resetForm: () => void
    resetImages: () => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    selectedFile: null,
    imagePreview: '',
    selectedStatus: 'published',
    selectedCategory: '',
    selectedTag: '',
    selectedTemplate: 'default template',
    selectedOnShelf: '',
    selectedInWarehouse: '',
    selectedName: '',
    selectedDescription: '',
    imageFiles: [],
    imagePreviews: [],
    selectedPrice: '',
    discountType: DiscountType.NoDiscount,
    selectedTaxClass: '',
    selectedVATAmount: '',
    selectedSKUNumber: '',
    selectedBarcodeNumber: '',
    isBackorder: false,
    variationColor: '',
    variationSize: '',
    variationMaterial: '',
    variationStyle: '',
    isPhysical: false,
    selectedMetaTitle: '',
    selectedMetaDescription: '',
    selectedMetaKeywords: '',
    errors: {},
    setSelectedFile: (value) => set({ selectedFile: value }),
    setImagePreview: (value) => set({ imagePreview: value }),
    setSelectedStatus: (value) => set({ selectedStatus: value }),
    setSelectedCategory: (value) => set({ selectedCategory: value }),
    setSelectedTag: (value) => set({ selectedTag: value }),
    setSelectedTemplate: (value) => set({ selectedTemplate: value }),
    setSelectedName: (value) => set({ selectedName: value }),
    setSelectedDescription: (value) => set({ selectedDescription: value }),
    setImageFiles: (file) => set((state) => ({
        imageFiles: [...state.imageFiles, file]
    })),
    setImagePreviews: (value) => set((state) => ({
        imagePreviews: [...state.imagePreviews, value]
    })),
    removeFiles: (index) => set((state) => ({
        imageFiles: state.imageFiles.filter((_, i) => i != index),
        imagePreviews: state.imagePreviews.filter((_, i) => i != index),
    })),
    resetImages: () => set(() => ({
        imageFiles: [],
        imagePreviews: [],
    })),
    setSelectedPrice: (value) => set({ selectedPrice: value }),
    setDiscountType: (value) => set({ discountType: value }),
    setSelectedTaxClass: (value) => set({ selectedTaxClass: value }),
    setSelectedVATAmount: (value) => set({ selectedVATAmount: value }),
    setSelectedSKUNumber: (value) => set({ selectedSKUNumber: value }),
    setSelectedBarcodeNumber: (value) => set({ selectedBarcodeNumber: value }),
    setSelectedOnShelf: (value) => set({ selectedOnShelf: value }),
    setSelectedInWarehouse: (value) => set({ selectedInWarehouse: value }),
    setIsBackorder: (value) => set({ isBackorder: value }),
    setVariationColor: (value) => set({ variationColor: value }),
    setVariationSize: (value) => set({ variationSize: value }),
    setVariationMaterial: (value) => set({ variationMaterial: value }),
    setVariationStyle: (value) => set({ variationStyle: value }),
    setIsPhysical: (value) => set({ isPhysical: value }),
    setSelectedMetaTitle: (value) => set({ selectedMetaTitle: value }),
    setSelectedMetaDescription: (value) => set({ selectedMetaDescription: value }),
    setSelectedMetaKeywords: (value) => set({ selectedMetaKeywords: value }),
    setErrors: (value) => set({ errors: value }),
    resetForm: () => set({
        selectedFile: null,
        imagePreview: '',
        selectedStatus: 'published',
        selectedCategory: '',
        selectedTag: '',
        selectedTemplate: 'default template',
        selectedOnShelf: '',
        selectedInWarehouse: '',
        selectedName: '',
        selectedDescription: '',
        selectedPrice: '',
        discountType: DiscountType.NoDiscount,
        selectedTaxClass: '',
        selectedVATAmount: '',
        selectedSKUNumber: '',
        selectedBarcodeNumber: '',
        isBackorder: false,
        isPhysical: false,
        imageFiles: [],
        imagePreviews: [],
        variationColor: '',
        variationSize: '',
        variationMaterial: '',
        variationStyle: '',
        selectedMetaTitle: '',
        selectedMetaDescription: '',
        selectedMetaKeywords: ''
    })
}))