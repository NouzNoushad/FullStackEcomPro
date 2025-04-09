import MainFooter from '@/components/MainFooter'
import MainHeader from '@/components/MainHeader/MainHeader'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex h-screen text-gray-900 bg-secondary">
            {/* Sidebar */}
            <Sidebar />
            {/* MainSection */}
            <div className="w-full lg:ml-[16.5rem] flex-1 h-full overflow-x-hidden overflow-y-auto">
                <MainHeader />
                {children}
                <MainFooter />
            </div>
        </div>
    )
}
