'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import MDEditor from '@uiw/react-md-editor'
import React from 'react'

export default function MetaDescription() {
    const { selectedMetaDescription, setSelectedMetaDescription } = useGlobalStore()

    return (
        <MDEditor value={selectedMetaDescription} onChange={(value) => setSelectedMetaDescription(value as string)} height={150} preview='edit' style={{ borderRadius: 8, overflow: "hidden" }} textareaProps={{
            placeholder: 'Type your text here...'
        }} previewOptions={{
            disallowedElements: ['style']
        }} />
    )
}
