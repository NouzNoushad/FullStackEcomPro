'use client'

import React, { useState } from 'react'
import Pagination from './Pagination'

export default function CategoriesCard() {
    const [currentPage, setCurrentPage] = useState(1)

    const items = Array.from({ length: 30 }, (_, i) => i + 1)

    const limit = 10
    const totalPages = Math.ceil(items.length / limit)
    const paginatedItems = items.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="px-8 py-9 w-full bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
            {/* Categories Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-md px-2 py-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-[#888] group-hover:text-green-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                    <span>
                        <input type="text" placeholder='Search Category' className='text-sm p-1 bg-transparent focus:outline-none focus:ring-0' />
                    </span>
                </div>
                <div>
                    <button className='bg-green-500 text-white px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors hover:bg-green-600'>Add Category</button>
                </div>
            </div>
            {/* Category Table */}
            <div className="w-full overflow-x-auto">
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='border-b-[1px] border-dashed'>
                            <th className='min-w-[250px] text-start font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Category</span></th>
                            <th className='min-w-[150px] text-center font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Category Type</span></th>
                            <th className='min-w-[70px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Categories */}
                        {
                            paginatedItems.map((item, index) => (
                                <tr key={index} className={`${index !== 9 ? "border-b-[1px] border-dashed" : ""}`}>
                                    <td className='py-4 flex items-center space-x-4'>
                                        <div className='h-11 w-11 bg-gray-100 rounded-md'></div>
                                        <div className="space-y-1">
                                            <div className='text-sm font-semibold'>{`Category ${item}`}</div>
                                            <p className='w-[600px] text-[13px] text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap'>Lorem ipsum, dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit optio atque excepturi accusantium asperiores nulla dolorum illum minima beatae, dolore nihil inventore tempora quam unde veritatis libero eveniet. Soluta, modi. </p>
                                        </div>
                                    </td>
                                    <td className='py-4 text-center'>
                                        <div className='text-[11px] font-semibold bg-green-100 text-green-500 inline-block p-1 rounded-md'>Automated</div>
                                    </td>
                                    <td className='py-4 text-end'>
                                        <div className='inline-flex items-center justify-end space-x-2 bg-gray-100 px-3 py-2 rounded-md'>
                                            <span className='text-xs font-medium'>Actions</span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Page & Pagination */}
            <div className="flex items-center justify-between gap-2">
                <div className="relative w-[10%]">
                    <select name="" id="" className='w-full px-2 py-3 appearance-none rounded-md bg-gray-100 focus:outline-none focus:ring-0 text-sm'>
                        <option value="">10</option>
                        <option value="">25</option>
                        <option value="">50</option>
                        <option value="">100</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="">
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}
