'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function PhysicalProduct() {
    const { isPhysical, setIsPhysical } = useGlobalStore()

    const handleIsPhysical = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPhysical(e.target.checked)
    }

    return (
        <input type="checkbox" checked={isPhysical} onChange={handleIsPhysical} className='h-5 w-5 rounded-md accent-black border-none' />
    )
}
