export interface ProductResponse {
    data: Product[]
    items: string
}

export interface ProductByIDResponse {
    data: Product
}

export interface Product {
    id: string
    thumbnail_name: string
    thumbnail_path: string
    status: string
    category: string
    tag: string
    template: string
    name: string
    description: string
    price: number
    discount_type: string
    tax_class: string
    vat_amount: number
    sku_number: string
    barcode_number: string
    on_shelf: number
    on_warehouse: number
    allow_backorder: boolean
    in_physical: boolean
    meta_title: string
    meta_description: string
    meta_keywords: string
    variations: Variations
    media: Media[]
    created_at: string
}

export interface Variations {
    color: string[]
    material: string[]
    size: string[]
    style: string[]
}

export interface Media {
    id: string
    product_id: string
    media_filename: string
    media_file_path: string
    created_at: string
}
