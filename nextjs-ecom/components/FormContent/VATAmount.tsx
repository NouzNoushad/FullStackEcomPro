'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function VATAmount() {
    const { selectedVATAmount, setSelectedVATAmount } = useGlobalStore()

    const handleVATAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVATAmount(e.target.value)
    }

    return (
        <input type="text" value={selectedVATAmount} onChange={handleVATAmountChange} className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm' placeholder='' />
    )
}
