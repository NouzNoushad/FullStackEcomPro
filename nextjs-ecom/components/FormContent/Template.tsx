'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function Template() {
    const { selectedTemplate, setSelectedTemplate } = useGlobalStore()

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemplate(e.target.value)
    }

    return (
        <select name="template" id="template" value={selectedTemplate} onChange={handleTemplateChange} className='select-arrow w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm'>
            <option value="default template">Default Template</option>
            <option value="electronics">Electronics</option>
            <option value="office stationary">Office Stationary</option>
            <option value="fashion">Fashion</option>
        </select>
    )
}
