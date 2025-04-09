'use client'

import { SaveProductAction } from '@/actions/SaveProduct'
import React from 'react'

export default function SaveButton() {
    const { handleSaveProduct } = SaveProductAction()
    return (
        <div className="pt-2 flex items-center justify-end space-x-4">
            <button className='bg-transparent px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors hover:bg-gray-200'>Cancel</button>
            <button onClick={handleSaveProduct} className='bg-green-500 text-white px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors hover:bg-green-600'>Save Changes</button>
        </div>
    )
}
