'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function MetaTitle() {

    const { selectedMetaTitle, setSelectedMetaTitle } = useGlobalStore()

    const handleMetaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMetaTitle(e.target.value)
    }

    return (
        <input type="text" value={selectedMetaTitle} onChange={handleMetaTitleChange} className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm' placeholder='Meta tag name' />
    )
}
