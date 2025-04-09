import ProductsCard from '@/components/Products/ProductsCard'
import React from 'react'

export default function Products() {
    return (
        <main className='px-8 py-5 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Products</h1>
                <p className='text-gray-400 text-xs font-medium'>Home</p>
            </div>
            <div className="mt-6">
                {/* Produts */}
                <ProductsCard />
            </div>
        </main>
    )
}
