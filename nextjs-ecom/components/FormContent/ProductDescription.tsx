'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import MDEditor from '@uiw/react-md-editor'
import React from 'react'

export default function ProductDescription() {
    const { selectedDescription, setSelectedDescription } = useGlobalStore()
    return (
        <MDEditor value={selectedDescription} onChange={(value) => setSelectedDescription(value as string)} height={300} preview='edit' style={{ borderRadius: 8, overflow: "hidden" }} textareaProps={{
            placeholder: 'Type your text here...'
        }} previewOptions={{
            disallowedElements: ['style']
        }} />
    )
}
