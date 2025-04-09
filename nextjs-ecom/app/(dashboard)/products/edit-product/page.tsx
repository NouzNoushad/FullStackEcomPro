import EditProductForm from '@/components/EditProductForm'
import { Product, ProductResponse } from '@/interface/ProductInterface'
import React from 'react'

export default async function EditProduct() {
    const response = await fetch('http://localhost:8004/product')
    const responseJson: ProductResponse = await response.json()
    const products: Product[] = responseJson.data

    return (
        <main className='px-8 py-5 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Edit Product</h1>
                <p className='text-gray-400 text-xs font-medium'>Home</p>
            </div>
            <EditProductForm product={products[0]} />
        </main>
    )
}
