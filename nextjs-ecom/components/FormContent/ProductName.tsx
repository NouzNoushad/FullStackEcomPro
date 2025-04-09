'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function ProductName() {
    const { selectedName, setSelectedName, errors } = useGlobalStore()

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(e.target.value)
    }

    return (
        <div>
            <input type="text" name="name" value={selectedName} onChange={handleNameChange} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm ${errors?.name ? 'border-red-500' : 'border-inherit'}`} placeholder='Product Name' />
            {errors?.name && <p className='text-xs text-red-500 mt-2'>{errors.name}</p>}
        </div>
    )
}
