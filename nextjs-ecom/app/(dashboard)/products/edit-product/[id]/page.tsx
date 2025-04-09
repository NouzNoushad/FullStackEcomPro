import EditProductForm from '@/components/EditProductForm'
import { Product, ProductByIDResponse } from '@/interface/ProductInterface'
import React from 'react'

export default async function EditProduct({ params }: { params: { id: string } }) {
    const paramsID = await params
    const id = paramsID.id ?? ""
    const response = await fetch(`http://localhost:8004/product/${id}`)
    const responseJson: ProductByIDResponse = await response.json()
    const product: Product = responseJson.data

    return (
        <main className='px-8 py-5 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Edit Product</h1>
                <p className='text-gray-400 text-xs font-medium'>Home</p>
            </div>
            <EditProductForm product={product} />
        </main>
    )
}
