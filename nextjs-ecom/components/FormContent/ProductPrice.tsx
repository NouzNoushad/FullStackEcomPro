'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function ProductPrice() {
    const { selectedPrice, setSelectedPrice, errors } = useGlobalStore()

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPrice(e.target.value)
    }

    return (
        <div>
            <input type="text" value={selectedPrice} onChange={handlePriceChange} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm ${errors?.price ? 'border-red-500' : 'border-inherit'}`} placeholder='Product Price' />
            {errors?.price && <p className='text-xs text-red-500 mt-2'>{errors.price}</p>}
        </div>

    )
}
