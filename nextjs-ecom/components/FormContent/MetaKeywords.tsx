'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function MetaKeywords() {
    const { selectedMetaKeywords, setSelectedMetaKeywords } = useGlobalStore()

    const handleMetaKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMetaKeywords(e.target.value)
    }
    return (
        <input type="text" value={selectedMetaKeywords} onChange={handleMetaKeywordsChange} className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm' placeholder='' />
    )
}
