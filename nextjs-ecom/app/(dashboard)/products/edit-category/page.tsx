import MainFormCategory from '@/components/CategoryForm/MainFormCategory'
import SideFormCategory from '@/components/CategoryForm/SideFormCategory'
import React from 'react'

export default function EditCategory() {
    return (
        <main className='px-8 py-5 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Edit Category</h1>
                <p className='text-gray-400 text-xs font-medium'>Home</p>
            </div>
            <div className="flex-1 mt-6 grid md:grid-cols-3 grid-cols-1 gap-6">
                {/* Side Form Content */}
                <SideFormCategory />
                {/* Main Form Content */}
                <MainFormCategory />
            </div>
        </main>
    )
}
