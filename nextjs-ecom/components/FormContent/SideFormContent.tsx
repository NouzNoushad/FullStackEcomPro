import React from 'react'
import Thumbnail from './Thumbnail'
import Status from './Status'
import Categories from './Categories'
import Tags from './Tags'
import Template from './Template'

export default function SideFormContent() {

    return (
        <div className="md:col-span-1 col-span-2 space-y-8 w-full">
            {/* Thumbnail */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-4 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Thumbnail</h3>
                <div className="flex items-center justify-center">
                    <Thumbnail />
                </div>
                <p className='px-2 text-[12.5px] text-gray-400 text-center'>Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
            </div>
            {/* Status */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-4 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <Status />
                <div className="space-y-2 pt-5 hidden">
                    <h6 className='text-[13.5px] font-medium'>Select publishing date and time</h6>
                    <input type="text" className='w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm' placeholder='Pick date and time' />
                </div>
            </div>
            {/* Product Details */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Product Details</h3>
                <div className="space-y-2">
                    <h6 className='text-[13.5px] font-medium'>Categories</h6>
                    <Categories />
                    <p className='mt-1 text-[12.5px] text-gray-400'>Add product to a category.</p>
                </div>
                <div className="px-3 py-2 bg-blue-50 rounded-md inline-block">
                    <div className="flex items-center space-x-1">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-primary-light-dark">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </span>
                        <small className='text-xs text-primary-light-dark font-semibold'>Create new category</small>
                    </div>
                </div>
                <div className="space-y-2">
                    <h6 className='text-[13.5px] font-medium'>Tags</h6>
                    <Tags />
                    <p className='mt-1 text-[12.5px] text-gray-400'>Add tags to a product.</p>
                </div>
            </div>
            {/* Product Template */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Product Template</h3>
                <div className="space-y-2">
                    <h6 className='text-[13.5px] font-medium'>Select a product template</h6>
                    <Template />
                    <p className='mt-1 text-[12.5px] text-gray-400 text-center'>Assign a template from your current theme to define how a single product is displayed.</p>
                </div>
            </div>
        </div>
    )
}
