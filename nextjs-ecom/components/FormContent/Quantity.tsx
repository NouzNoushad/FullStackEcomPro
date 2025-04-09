'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function Quantity() {

    const { selectedOnShelf, selectedInWarehouse, setSelectedOnShelf, setSelectedInWarehouse, errors } = useGlobalStore()

    const handleOnShelfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSelectedOnShelf(e.target.value)
    }

    const handleInWarehouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSelectedInWarehouse(e.target.value)
    }

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="">
                <input type="number" defaultValue={selectedOnShelf} onWheelCapture={(e) => e.currentTarget.blur()} onChange={handleOnShelfChange} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm ${errors.on_shelf ? 'border-red-500' : 'border-inherit'}`} placeholder='On self' />
                {errors?.on_shelf && <p className='text-xs text-red-500 mt-2'>{errors.on_shelf}</p>}
                <p className='mt-1 text-[12.5px] text-gray-400'>Enter the product quantity.</p>
            </div>
            <div className="">
                <input type="number" defaultValue={selectedInWarehouse} onWheelCapture={(e) => e.currentTarget.blur()} onChange={handleInWarehouseChange} className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm' placeholder='In warehouse' />
            </div>
        </div>
    )
}
