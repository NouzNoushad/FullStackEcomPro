'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function VariationColor() {

    const { variationColor, setVariationColor } = useGlobalStore()

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariationColor(e.target.value)
    }
    return (
        <input type="text" value={variationColor} onChange={handleColorChange} className='w-full sm:w-[calc(100%-(100%/3))] border px-2 py-3 rounded-md placeholder:text-[13.5px] text-sm focus:outline-none focus:ring-0' placeholder='eg: black, blue' />
    )
}
