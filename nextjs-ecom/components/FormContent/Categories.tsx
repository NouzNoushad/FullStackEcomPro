'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function Categories() {
    const { selectedCategory, setSelectedCategory } = useGlobalStore()

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value)
    }

    return (
        <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange} className='select-arrow w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm'>
            <option value="" className='hidden'>Select an option</option>
            <option value="computers">Computers</option>
            <option value="watches">Watches</option>
            <option value="headphones">Headphones</option>
            <option value="footwear">Footwear</option>
            <option value="cameras">Cameras</option>
            <option value="shirts">Shirts</option>
            <option value="household">Households</option>
            <option value="handbags">Handbags</option>
            <option value="wines">Wines</option>
            <option value="sandals">Sandals</option>
        </select>
    )
}