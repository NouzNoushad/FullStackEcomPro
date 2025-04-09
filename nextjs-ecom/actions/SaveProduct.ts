import { useGlobalStore } from "@/context/Store/GlobalStore"
import { convertDiscountTypeToString, LinksType } from "@/lib/Constants"
import { productValidation } from "./Validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { useSidebarStore } from "@/context/Store/SidebarStore"

export const SaveProductAction = () => {

    const { selectedFile, selectedStatus, selectedCategory, selectedTag, selectedTemplate, selectedName, selectedDescription, selectedPrice, discountType, selectedTaxClass, selectedVATAmount, selectedSKUNumber, selectedBarcodeNumber, selectedOnShelf, selectedInWarehouse, isBackorder, isPhysical, selectedMetaTitle, selectedMetaDescription, selectedMetaKeywords, variationColor, variationSize, variationMaterial, variationStyle, resetForm, setErrors, imageFiles } = useGlobalStore()
    const { setSelectedLink } = useSidebarStore()

    const { id } = useParams()

    const queryClient = useQueryClient()
    const router = useRouter()

    const productFormMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const endPoint = id ? `http://localhost:8004/product/${id}` : 'http://localhost:8004/product'
            const method = id ? "PUT" : "POST"
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
                Form has been successfully submitted
                </div>
                `,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                resetForm()
                router.push('/')
                setSelectedLink(LinksType.Products)
            });
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
        }
    })

    const handleSaveProduct = async () => {

        const formData = new FormData()

        formData.append("thumbnail", selectedFile ? selectedFile : "")
        formData.append("status", selectedStatus)
        formData.append("category", selectedCategory)
        formData.append("tag", selectedTag)
        formData.append("template", selectedTemplate)
        formData.append("name", selectedName)
        formData.append("description", selectedDescription)

        imageFiles.forEach((file) => {
            formData.append("media_files", file)
        })

        formData.append("price", selectedPrice ? selectedPrice.toString() : "0")
        formData.append("discount_type", convertDiscountTypeToString(discountType))
        formData.append("tax_class", selectedTaxClass)
        formData.append("vat_amount", selectedVATAmount ? selectedVATAmount.toString() : '0')
        formData.append("sku_number", selectedSKUNumber)
        formData.append("barcode_number", selectedBarcodeNumber)
        formData.append("on_shelf", selectedOnShelf ? selectedOnShelf?.toString() : '0')
        formData.append("on_warehouse", selectedInWarehouse ? selectedInWarehouse.toString() : '0')
        formData.append("allow_backorder", isBackorder ? isBackorder.toString() : 'false')
        formData.append("in_physical", isPhysical ? isPhysical.toString() : 'false')
        formData.append("meta_title", selectedMetaTitle)
        formData.append("meta_description", selectedMetaDescription)
        formData.append("meta_keywords", selectedMetaKeywords)

        formData.append("color", variationColor)
        formData.append("size", variationSize)
        formData.append("material", variationMaterial)
        formData.append("style", variationStyle)


        console.log(`///////////// formdata: thumbnail: ${formData.get('thumbnail')} status: ${formData.get('status')}, cat: ${formData.get('category')}, tag: ${formData.get('tag')}, template: ${formData.get('template')}, name: ${formData.get('name')}, desc: ${formData.get('description')}, price: ${formData.get('price')}, discount: ${formData.get('discount_type')}, tax: ${formData.get('tax_class')}, vat: ${formData.get('vat_amount')}, sku: ${formData.get('sku_number')}, barcode: ${formData.get('barcode_number')}, shelf: ${formData.get('on_shelf')}, warehouse: ${formData.get('on_warehouse')}, backorder: ${formData.get('allow_backorder')}, physical: ${formData.get('in_physical')}, metatitle: ${formData.get('meta_title')}, metades: ${formData.get('meta_description')}, metakey: ${formData.get('meta_keywords')}, size: ${formData.get('size')}, color: ${formData.get('color')}, material: ${formData.get('material')}, style: ${formData.get('style')}, files: ${formData.get("media_files")}`,)

        // validation
        const validation = await productValidation(formData)
        if (validation?.errors) {
            setErrors(validation.errors)
            Swal.fire({
                html: `
                <div style="font-size:15px">
                Sorry, looks like there are some errors detected, please try again.
                <br>
                <br>
                Please note that there may be errors in the <strong>General</strong> or <strong>Advanced</strong> tabs
                </div>
                `,
                icon: "error",
                confirmButtonText: "Ok, got it!",
                confirmButtonColor: "#008000",
            });
        }

        productFormMutation.mutate(formData)
    }

    return {
        handleSaveProduct,
        loading: productFormMutation.isPending,
    }
}