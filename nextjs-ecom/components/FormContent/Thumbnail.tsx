'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import Image from 'next/image'
import React from 'react'

export default function Thumbnail() {

    const {imagePreview, setSelectedFile, setImagePreview } = useGlobalStore()

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const file = e.target.files?.[0]

        if (file != null) {
            setSelectedFile(file)
            const imageUrl = URL.createObjectURL(file)
            setImagePreview(imageUrl)
        }

        e.target.value = ""
    }

    return (
        <div className="relative h-[10rem] w-[10rem]">
            <div className="h-full w-full bg-white rounded-md shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)]">
                {
                     imagePreview && (
                        <Image src={imagePreview} height={100} width={100} alt='Thumbnail' className='h-full w-full rounded-md' />
                    )
                }
            </div>
            <label className="absolute top-[-10px] right-[-10px] h-8 w-8 bg-white rounded-full shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)] flex items-center justify-center focus:outline-none focus:ring-0 group cursor-pointer">
                <input type="file" onChange={handleFileUpload} name='image' accept='image/*' hidden />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 transition-colors duration-200 group-hover:text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </label>
        </div>
    )
}
