import React from 'react'

export default function MainFooter() {
    return (
        <footer className='mt-5 bg-white px-8 py-5 border-t border-gray-200'>
            <div className="flex items-center justify-between text-[13px] text-gray-400 font-medium">
                <div className="">2025© <span className='ml-1 text-gray-800'>Ecom Pro</span></div>
                <div className="space-x-3">
                    <a href="#" className='transition-colors hover:text-blue-500'>About</a>
                    <a href="#" className='transition-colors hover:text-blue-500'>Support</a>
                    <a href="#" className='transition-colors hover:text-blue-500'>Purchase</a>
                </div>
            </div>
        </footer>
    )
}
