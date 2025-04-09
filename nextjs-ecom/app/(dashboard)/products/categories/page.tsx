import CategoriesCard from '@/components/CategoriesCard'
import React from 'react'

export default function Categories() {
    return (
        <main className='px-8 py-5 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Categories</h1>
                <p className='text-gray-400 text-xs font-medium'>Home</p>
            </div>
            <div className="mt-6">
                {/* Categories */}
                <CategoriesCard />
            </div>
        </main>
    )
}
