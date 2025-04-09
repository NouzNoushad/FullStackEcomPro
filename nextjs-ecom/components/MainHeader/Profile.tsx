'use client'

import { useHeaderStore } from '@/context/Store/HeaderStore'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function UserProfile() {
    const { showProfile, setShowProfile } = useHeaderStore()

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("token")
        router.push('/users/login')
    }

    return (
        <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)} className='transition-opacity rounded-md focus:outline-none focus:ring-0'>
                <div className="w-10 h-10 rounded-md bg-gray-200"></div>
            </button>
            <div className={`absolute right-0 w-48 py-2 bg-white rounded-md shadow-lg top-15 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all transform ease-out ${showProfile ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-1/2 opacity-0 pointer-events-none"}`}>
                <a href="#" className='block px-4 py-2 text-[13px] text-gray-700 transition-colors hover:bg-gray-100'>
                    Your Profile
                </a>
                <a href="#" className='block px-4 py-2 text-[13px] text-gray-700 transition-colors hover:bg-gray-100'>
                    Settings
                </a>
                <button onClick={handleLogout} className='w-full text-start block px-4 py-2 text-[13px] text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-0'>
                    Logout
                </button>
            </div>
        </div>
    )
}
