'use client'

import React from 'react'
import SidebarLinks from './SidebarLinks'
import { useSidebarStore } from '@/context/Store/SidebarStore'

export default function Sidebar() {
    const { showMenu, setShowMenu } = useSidebarStore()
    return (
        <aside className={`fixed z-50 h-full lg:left-0 transition-all ease-in-out duration-200 flex-shrink-0 w-[16.5rem] bg-primary text-white ${showMenu ? 'left-0' : 'left-[-100%]'}`}>
            <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className='flex-shrink-0 h-[4.5rem] border-b border-dashed border-[#33446C] flex items-center justify-between px-4 py-2'>
                    <div className="flex items-center space-x-2">
                        <span className='h-10 w-10 bg-primary-light rounded-full inline-block'>
                            <h6 className='h-full flex items-center justify-center text-white uppercase font-semibold'>EP</h6>
                        </span>
                        <span>
                            <h1 className='font-medium text-lg'>Ecom Products</h1>
                        </span>
                    </div>
                    <button onClick={() => setShowMenu(showMenu)} className='lg:hidden p-2 bg-primary-light-dark rounded-md focus:outline-none focus:ring-0'>
                        <svg className='size-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#fff' d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" /></svg>
                    </button>
                </div>
                {/* Siderbar Links */}
                <SidebarLinks />
            </div>
        </aside>
    )
}
