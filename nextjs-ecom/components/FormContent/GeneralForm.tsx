import React from 'react'
import ProductName from './ProductName'
import ProductDescription from './ProductDescription'
import ProductPrice from './ProductPrice'
import Discount from './DiscountType'
import TaxClass from './TaxClass'
import VATAmount from './VATAmount'
import Media from './Media'

export default function GeneralForm() {

    return (
        <div className='my-5 space-y-8'>
            {/* General */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>General</h3>
                <div className='space-y-6'>
                    <div className="space-y-2">
                        <h6 className='text-[13.5px] font-medium'>Product Name <span className='text-red-500'>*</span></h6>
                        <ProductName />
                        <p className='mt-1 text-[12.5px] text-gray-400'>A product name is required and recommended to be unique.</p>
                    </div>
                    <div className="space-y-2" data-color-mode="light">
                        <h6 className='text-[13.5px] font-medium'>Description</h6>
                        <ProductDescription />
                        <p className='mt-1 text-[12.5px] text-gray-400'>Set a description to the product for better visibility.</p>
                    </div>
                </div>
            </div>
            {/* Media */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Media</h3>
                <div className="">
                    <Media />
                    <p className='mt-2 text-[12.5px] text-gray-400'>Set the product media gallery.</p>
                </div>
            </div>
            {/* Pricing */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Pricing</h3>
                <div className='space-y-6'>
                    {/* Base Price */}
                    <div className="space-y-2">
                        <h6 className='text-[13.5px] font-medium'>Base Price <span className='text-red-500'>*</span></h6>
                        <ProductPrice />
                        <p className='mt-1 text-[12.5px] text-gray-400'>Set the product price.</p>
                    </div>
                    {/* Discount Type */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                            <h6 className='text-[13.5px] font-medium'>Discount Type</h6>
                            <div className='h-3 w-3 bg-gray-300 rounded-full text-[10px] text-gray-500 flex items-center justify-center'>!</div>
                        </div>
                        <Discount />
                    </div>
                    {/* Tax and Amount */}
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <h6 className='text-[13.5px] font-medium'>Tax Class <span className='text-red-500'>*</span></h6>
                            <TaxClass />
                            <p className='mt-1 text-[12.5px] text-gray-400'>Set the product tax class.</p>
                        </div>
                        <div className="space-y-2">
                            <h6 className='text-[13.5px] font-medium'>VAT Amount (%)</h6>
                            <VATAmount />
                            <p className='mt-1 text-[12.5px] text-gray-400'>Set the product VAT about.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
