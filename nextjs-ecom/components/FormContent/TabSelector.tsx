'use client'

import React from 'react'
// lazy loading
const GeneralForm = dynamic(() => import("./GeneralForm"), { ssr: false })
const AdvancedForm = dynamic(() => import("./AdvancedForm"), { ssr: false })
import { TabState } from '@/lib/Constants'
import dynamic from 'next/dynamic'
import SaveButton from './SaveButton'
import { useTabStore } from '@/context/Store/TabStore'

export default function TabSelector() {
    const { selectedTab, setSelectedTab } = useTabStore()

    return (
        <>
            {/* Tabs */}
            <div className="space-x-6">
                <button onClick={() => setSelectedTab(TabState.General)} className={`relative inline-block focus:outline-none focus:ring-0 py-4 before:absolute before:bottom-0 before:h-[2px] before:w-full transition-colors ${selectedTab == TabState.General ? "before:bg-green-800 text-green-800" : "before:bg-transparent text-gray-400"} `}>General</button>
                <button onClick={() => setSelectedTab(TabState.Advanced)} className={`relative inline-block focus:outline-none focus:ring-0 py-4 before:absolute before:bottom-0 before:h-[2px] before:w-full transition-colors ${selectedTab == TabState.Advanced ? "before:bg-green-800 text-green-800" : "before:bg-transparent text-gray-400"}`}>Advanced</button>
            </div>
            {/* Tab View */}
            <div className="space-y-8">
                {
                    selectedTab == TabState.General ? (
                        // General Form
                        <GeneralForm />
                    ) : (
                        // Advanced Form
                        <AdvancedForm />
                    )
                }
                <SaveButton />
            </div>
        </>
    )
}
