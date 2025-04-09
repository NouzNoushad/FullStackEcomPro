'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import Image from 'next/image'
import React from 'react'

export default function Media() {

    const { setImageFiles, setImagePreviews, imagePreviews, removeFiles } = useGlobalStore()

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target.files) return

        const file = e.target.files?.[0]

        if (file != null) {
            setImageFiles(file)
            setImagePreviews(URL.createObjectURL(file))
        }

        e.target.value = ""
    }

    const handleRemoveImage = (index: number, event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()

        removeFiles(index)
    }

    return (
        <div className="bg-green-50 border border-dashed border-green-500 px-6 py-4 rounded-md cursor-pointer">
            { imagePreviews.length != 0 ? <label className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-4">
                <input type="file" onChange={handleFileUpload} name='image' accept='image/*' hidden />
                {
                    imagePreviews.map((image, index) => (
                        <div className="" key={index}>
                            <div className="relative h-[7rem] w-[7rem]">
                                <div className="h-full w-full bg-white rounded-md shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)]">
                                    <Image src={image} height={100} width={100} alt='Thumbnail' className='h-full w-full rounded-md' />
                                </div>
                                <button type='button' onClick={(e) => handleRemoveImage(index, e)} className="absolute top-[-10px] right-[-10px] h-7 w-7 bg-white rounded-full shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)] flex items-center justify-center focus:outline-none focus:ring-0 group cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 transition-colors duration-200 group-hover:text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </label> :
                <label className="flex items-center space-x-4 cursor-pointer">
                    <input type="file" onChange={handleFileUpload} name='image' accept='image/*' hidden />
                    <div className='bg-green-200 p-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                    <span className='space-y-1'>
                        <h4 className='text-[15px] font-medium'>Drop files here or click to upload.</h4>
                        <p className='text-[12.5px] text-gray-400'>Upload up to 10 files</p>
                    </span>
                </label>}
        </div>
    )
}
