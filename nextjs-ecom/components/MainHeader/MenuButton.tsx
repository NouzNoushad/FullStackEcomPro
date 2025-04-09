'use client'

import { useHeaderStore } from '@/context/Store/HeaderStore'
import React from 'react'

export default function MenuButton() {
    const { setShowMenu, showMenu } = useHeaderStore()
    return (
        <button onClick={() => setShowMenu(showMenu)} className='block lg:hidden focus:outline-none focus:ring-0 border p-2 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    )
}
