/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import SideFormContent from './FormContent/SideFormContent'
import MainFormContent from './FormContent/MainFormContent'
import { useGlobalStore } from '@/context/Store/GlobalStore'

export default function AddProductForm() {
    const { resetForm } = useGlobalStore()

    useEffect(() => {
        resetForm()
    }, [])
    
    return (
        <div className="flex-1 mt-6 grid md:grid-cols-3 grid-cols-1 gap-6">
            {/* Side Form Content */}
            <SideFormContent />
            {/* Main Form Content */}
            <MainFormContent />
        </div>
    )
}
