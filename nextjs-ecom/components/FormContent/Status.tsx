'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function Status() {

    const { selectedStatus, setSelectedStatus } = useGlobalStore()

    const handleStatusColor = (status: string): string => {
        switch (status) {
            case 'published':
                return 'bg-green-500'
            case 'draft':
                return 'bg-blue-500'
            case 'scheduled':
                return 'bg-orange-500'
            case 'inactive':
                return 'bg-red-500'
            default:
                return 'bg-green-500'
        }
    }

    return (
        <div className='space-y-4'>
            <div className="flex items-center justify-between">
                <h3 className='text-[19px] font-semibold'>Status</h3>
                <div className={`h-4 w-4 rounded-full ${handleStatusColor(selectedStatus)}`}></div>
            </div>
            <div className="">
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} name="status" id="status" className='select-arrow w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm'>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="inactive">Inactive</option>
                </select>
                <p className='mt-1 text-[12.5px] text-gray-400'>Set the product status.</p>
            </div>
        </div>
    )
}
