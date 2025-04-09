'use client'

import { AutomationType } from '@/lib/Constants'
import MDEditor from '@uiw/react-md-editor'
import React, { useState } from 'react'

export default function MainFormCategory() {
    const [categoryDescription, setCategoryDescription] = useState("")
    const [categoryTagDescription, setCategoryTagDescription] = useState("")
    const [automationType, setAutomationType] = useState<AutomationType>(AutomationType.Manual)

    return (
        <div className="col-span-2">
            <div className='mb-5 space-y-5'>
                {/* General */}
                <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                    <h3 className='text-[19px] font-semibold'>General</h3>
                    <div className='space-y-6'>
                        <div className="space-y-2">
                            <h6 className='text-[13.5px] font-medium'>Category Name <span className='text-red-500'>*</span></h6>
                            <input type="text" className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px]' placeholder='Category Name' />
                            <p className='mt-1 text-[12.5px] text-gray-400'>A category name is required and recommended to be unique.</p>
                        </div>
                        <div className="space-y-2" data-color-mode="light">
                            <h6 className='text-[13.5px] font-medium'>Description</h6>
                            <MDEditor value={categoryDescription} onChange={(value) => setCategoryDescription(value as string)} height={300} preview='edit' style={{ borderRadius: 8, overflow: "hidden" }} textareaProps={{
                                placeholder: 'Type your text here...'
                            }} previewOptions={{
                                disallowedElements: ['style']
                            }} />
                            <p className='mt-1 text-[12.5px] text-gray-400'>Set a description to the category for better visibility.</p>
                        </div>
                    </div>
                </div>
                {/* Meta Options */}
                <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                    <h3 className='text-[19px] font-semibold'>Meta Options</h3>
                    <div className='space-y-6'>
                        <div className="space-y-2">
                            <h6 className='text-[13.5px] font-medium'>Meta Tag Title</h6>
                            <input type="text" className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px]' placeholder='Meta tag name' />
                            <p className='mt-1 text-[12.5px] text-gray-400'>Set a meta tag title. Recommended to be simple and precise keywords</p>
                        </div>
                        <div className="space-y-2" data-color-mode="light">
                            <h6 className='text-[13.5px] font-medium'>Description</h6>
                            <MDEditor value={categoryTagDescription} onChange={(value) => setCategoryTagDescription(value as string)} height={150} preview='edit' style={{ borderRadius: 8, overflow: "hidden" }} textareaProps={{
                                placeholder: 'Type your text here...'
                            }} previewOptions={{
                                disallowedElements: ['style']
                            }} />
                            <p className='mt-1 text-[12.5px] text-gray-400'>Set a meta tag description to the product for increased SEO ranking.</p>
                        </div>
                        <div className="space-y-2">
                            <h6 className='text-[13.5px] font-medium'>Meta Tag Keywords</h6>
                            <input type="text" className='border w-full px-2 py-3 rounded-md placeholder:text-[13.5px]' placeholder='' />
                            <p className='mt-1 text-[12.5px] text-gray-400'>Set a list of keywords that the category is related to. Separate the keywords by adding a comma , between each keyword.</p>
                        </div>
                    </div>
                </div>
                {/* Automation */}
                <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                    <h3 className='text-[19px] font-semibold'>Automation</h3>
                    <div className="">
                        <h6 className='text-[13.5px] font-medium mb-4'>Product assignment method</h6>
                        <button onClick={() => setAutomationType(AutomationType.Manual)} className="flex items-center space-x-4 focus:outline-none focus:ring-0">
                            <div className='flex-shrink-0'>
                                <input type="radio" checked={automationType == AutomationType.Manual} readOnly className='size-5 accent-transparent' />
                            </div>
                            <div className='flex-1 text-start space-y-2'>
                                <h6 className='text-[13px] font-medium'>Manual</h6>
                                <p className='text-[13px] leading-[18px] text-gray-400'>Add products to this category one by one by manually selecting this category during product creation or update.</p>
                            </div>
                        </button>
                        <hr className='border-t-[0.1rem] border-dashed border-gray-200 my-5' />
                        <button onClick={() => setAutomationType(AutomationType.Automatic)} className="flex items-center space-x-4 focus:outline-none focus:ring-0">
                            <div className='flex-shrink-0'>
                                <input type="radio" checked={automationType == AutomationType.Automatic} readOnly className='size-5 accent-transparent' />
                            </div>
                            <div className='flex-1 text-start space-y-2'>
                                <h6 className='text-[13px] font-medium'>Automatic</h6>
                                <p className='text-[13px] leading-[18px] text-gray-400'>Products matched with the following conditions will be automatically assigned to this category.</p>
                            </div>
                        </button>
                    </div>
                </div>
                {/* Buttons */}
                <div className="pt-2 flex items-center justify-end space-x-4">
                    <button className='bg-transparent px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors hover:bg-gray-200'>Cancel</button>
                    <button className='bg-green-500 text-white px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors hover:bg-green-600'>Save Changes</button>
                </div>
            </div>
        </div>
    )
}
