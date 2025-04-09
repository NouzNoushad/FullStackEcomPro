'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function Tags() {
    const { selectedTag, setSelectedTag } = useGlobalStore()

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTag(e.target.value)
    }

    return (
        <input type="text" value={selectedTag} onChange={handleTagChange} className='border w-full px-2 py-3 rounded-md focus:outline-none focus:ring-0 text-sm' placeholder='' />
    )
}
