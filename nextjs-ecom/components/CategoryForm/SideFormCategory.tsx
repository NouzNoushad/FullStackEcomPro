import React from 'react'

export default function SideFormCategory() {
    return (
        <div className="col-span-1 space-y-8">
            {/* Thumbnail */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-4 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Thumbnail</h3>
                <div className="flex items-center justify-center">
                    <div className="relative h-[10rem] w-[10rem]">
                        <div className="h-full w-full bg-white rounded-md shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)]"></div>
                        <div className="absolute top-[-10px] right-[-10px] h-7 w-7 bg-white rounded-full shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)]"></div>
                    </div>
                </div>
                <p className='px-2 text-[12.5px] text-gray-400 text-center'>Set the category thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted</p>
            </div>
            {/* Status */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-4 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between">
                    <h3 className='text-[19px] font-semibold'>Status</h3>
                    <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="">
                    <select name="" id="" className='w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm'>
                        <option value="">Published</option>
                        <option value="">Scheduled</option>
                        <option value="">Unpublished</option>
                    </select>
                    <p className='mt-1 text-[12.5px] text-gray-400'>Set the category status.</p>
                </div>
                <div className="space-y-2 pt-5 hidden">
                    <h6 className='text-[13.5px] font-medium'>Select publishing date and time</h6>
                    <input type="text" className='w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm' placeholder='Pick date and time' />
                </div>
            </div>
            {/* Product Template */}
            <div className="px-8 py-9 bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)]">
                <h3 className='text-[19px] font-semibold'>Store Template</h3>
                <div className="space-y-2">
                    <h6 className='text-[13.5px] font-medium'>Select a store template</h6>
                    <select name="" id="" className='w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm'>
                        <option value="">Default Template</option>
                        <option value="">Electronics</option>
                        <option value="">Office Stationary</option>
                        <option value="">Fashion</option>
                    </select>
                    <p className='mt-1 text-[12.5px] text-gray-400 text-center'>Assign a template from your current theme to define how the category products are displayed.</p>
                </div>
            </div>
        </div>
    )
}
