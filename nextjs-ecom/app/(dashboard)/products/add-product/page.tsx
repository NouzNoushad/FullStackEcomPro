import AddProductForm from '@/components/AddProductForm'
import React from 'react'

export default function AddProduct() {
    return (
        <main className='px-8 py-5 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Product Form</h1>
                <p className='text-gray-400 text-xs font-medium'>Home</p>
            </div>
            <AddProductForm />
        </main>
    )
}
