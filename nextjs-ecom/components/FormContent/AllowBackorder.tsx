'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function AllowBackorder() {

    const { isBackorder, setIsBackorder } = useGlobalStore()

    const handleBackOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBackorder(Boolean(e.target.checked))
    }

    return (
        <input type="checkbox" checked={isBackorder} onChange={handleBackOrderChange} className='h-5 w-5 rounded-md accent-black border-none' />
    )
}
