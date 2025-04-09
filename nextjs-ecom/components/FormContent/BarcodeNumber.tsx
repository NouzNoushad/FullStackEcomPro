'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function BarcodeNumber() {

    const { selectedBarcodeNumber, setSelectedBarcodeNumber, errors } = useGlobalStore()

    const handleBarcodeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBarcodeNumber(e.target.value)
    }

    return (
        <div>
            <input type="text" value={selectedBarcodeNumber} onChange={handleBarcodeNumberChange} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm ${errors?.barcode_number ? 'border-red-500' : 'border-inherit'}`} placeholder='Barcode Number' />
            {errors?.barcode_number && <p className='text-xs text-red-500 mt-2'>{errors.barcode_number}</p>}
        </div>

    )
}
