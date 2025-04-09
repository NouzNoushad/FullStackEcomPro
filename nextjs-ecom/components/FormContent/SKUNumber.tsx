'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function SKUNumber() {
    const { selectedSKUNumber, setSelectedSKUNumber, errors } = useGlobalStore()

    const handleSKUNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSKUNumber(e.target.value)
    }

    return (
        <div>
            <input type="text" value={selectedSKUNumber} onChange={handleSKUNumberChange} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm ${errors?.sku_number ? 'border-red-500' : 'border-inherit'}`} placeholder='SKU Number' />
            {errors?.sku_number && <p className='text-xs text-red-500 mt-2'>{errors.sku_number}</p>}
        </div>
    )
}
