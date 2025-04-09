'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import { DiscountType } from '@/lib/Constants'
import React from 'react'

export default function Discount() {
    const { discountType, setDiscountType } = useGlobalStore()

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {/* No Discount */}
            <button type='button' onClick={() => setDiscountType(DiscountType.NoDiscount)} className={` border border-dashed px-6 py-5 rounded-md focus:outline-none focus:ring-0 ${discountType == DiscountType.NoDiscount ? "bg-green-50 border-green-500" : "bg-transparent border-gray-200"}`}>
                <div className="flex items-center space-x-2">
                    <span>
                        <input type="radio" checked={discountType == DiscountType.NoDiscount} readOnly className='size-4 accent-transparent' />
                    </span>
                    <span>
                        <h2 className='text-base font-semibold'>No Discount</h2>
                    </span>
                </div>
            </button>
            {/* Percentage */}
            <button type='button' onClick={() => setDiscountType(DiscountType.Percentage)} className={` border border-dashed px-6 py-5 rounded-md focus:outline-none focus:ring-0 ${discountType == DiscountType.Percentage ? "bg-green-50 border-green-500" : "bg-transparent border-gray-200"}`}>
                <div className="flex items-center space-x-2">
                    <span>
                        <input type="radio" checked={discountType == DiscountType.Percentage} readOnly className='size-4 accent-transparent' />
                    </span>
                    <span>
                        <h2 className='text-base font-semibold'>Percentage %</h2>
                    </span>
                </div>
            </button>
            {/* Fixed Price */}
            <button type='button' onClick={() => setDiscountType(DiscountType.FixedPrice)} className={` border border-dashed px-6 py-5 rounded-md focus:outline-none focus:ring-0 ${discountType == DiscountType.FixedPrice ? "bg-green-50 border-green-500" : "bg-transparent border-gray-200"}`}>
                <div className="flex items-center space-x-2">
                    <span>
                        <input type="radio" checked={discountType == DiscountType.FixedPrice} readOnly className='size-4 accent-transparent' />
                    </span>
                    <span>
                        <h2 className='text-base font-semibold'>Fixed Price</h2>
                    </span>
                </div>
            </button>
        </div>
    )
}
