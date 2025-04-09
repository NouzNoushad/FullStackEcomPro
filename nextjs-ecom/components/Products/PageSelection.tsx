'use client'

import React from 'react'
import Pagination from '../Pagination'
import { useProductsStore } from '@/context/Store/ProductStore'
import { Product } from '@/interface/ProductInterface'
import { LIMIT } from '@/lib/Constants'

export default function PageSelection({ products }: { products: Product[] }) {
    const { currentPage, setCurrentPage } = useProductsStore()

    const totalPages = Math.ceil(products.length / LIMIT)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="relative w-[5rem]">
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
    )
}
