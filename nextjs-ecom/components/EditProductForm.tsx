'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import SideFormContent from './FormContent/SideFormContent'
import MainFormContent from './FormContent/MainFormContent'
import { Product } from '@/interface/ProductInterface'
import { useGlobalStore } from '@/context/Store/GlobalStore'
import { convertStringToDiscountType } from '@/lib/Constants'

export default function EditProductForm({ product }: { product: Product }) {

    const { setImagePreview, setSelectedName, setSelectedDescription, setSelectedCategory, setSelectedStatus, setSelectedBarcodeNumber, setSelectedTag, setSelectedTaxClass, setSelectedTemplate, setSelectedInWarehouse, setSelectedPrice, setSelectedVATAmount, setSelectedSKUNumber, setSelectedOnShelf, setSelectedMetaTitle, setSelectedMetaDescription, setSelectedMetaKeywords, setIsBackorder, setIsPhysical, setDiscountType, setVariationColor, setVariationSize, setVariationMaterial, setVariationStyle, setImagePreviews, resetImages } = useGlobalStore()

    useEffect(() => {
        resetImages()
        
        setImagePreview(`http://localhost:8004/uploads/${product.thumbnail_name}`)

        setSelectedStatus(product.status)
        setSelectedCategory(product.category)
        setSelectedTag(product.tag)
        setSelectedTemplate(product.template)
        setSelectedName(product.name)
        setSelectedDescription(product.description)
        setSelectedPrice(product.price.toString())
        setDiscountType(convertStringToDiscountType(product.discount_type))
        setSelectedTaxClass(product.tax_class)
        setSelectedVATAmount(product.vat_amount.toString())
        setSelectedSKUNumber(product.sku_number)
        setSelectedBarcodeNumber(product.barcode_number)
        setSelectedOnShelf(product.on_shelf.toString())
        setSelectedInWarehouse(product.on_warehouse.toString())
        setIsBackorder(product.allow_backorder)
        setIsPhysical(product.in_physical)
        setSelectedMetaTitle(product.meta_title)
        setSelectedMetaDescription(product.meta_description)
        setSelectedMetaKeywords(product.meta_keywords)

        setVariationColor(product.variations.color.join(', '))
        setVariationSize(product.variations.size.join(', '))
        setVariationMaterial(product.variations.material.join(', '))
        setVariationStyle(product.variations.style.join(', '))

        product.media.forEach((media) => setImagePreviews(`http://localhost:8004/medias/${media.media_filename}`))
    }, [])

    return (
        <div className="flex-1 mt-6 grid md:grid-cols-3 grid-cols-1 gap-6">
            {/* Side Form Content */}
            <SideFormContent />
            {/* Main Form Content */}
            <MainFormContent />
        </div>
    )
}
