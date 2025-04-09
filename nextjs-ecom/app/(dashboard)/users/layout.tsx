import React from 'react'

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='flex flex-row h-fit min-h-screen w-full overflow-y-auto'>
            <div className="hidden lg:flex flex-1 bg-primary items-center justify-center">
                <div className="flex items-center space-x-2">
                    <span className='h-10 w-10 bg-primary-light rounded-full inline-block'>
                        <h6 className='h-full flex items-center justify-center text-white uppercase font-semibold'>EP</h6>
                    </span>
                    <span>
                        <h1 className='text-xl font-medium text-white'>Ecom Products</h1>
                    </span>
                </div>
            </div>
            <div className="flex-1 min-h-screen flex flex-col">
                <div className="lg:hidden flex-shrink-0 bg-primary flex items-center justify-center py-4">
                    <div className="flex items-center space-x-2">
                        <span className='h-8 w-8 bg-primary-light rounded-full inline-block'>
                            <h6 className='h-full flex items-center justify-center text-white uppercase font-semibold text-sm'>EP</h6>
                        </span>
                        <span>
                            <h1 className='text-base font-medium text-white'>Ecom Products</h1>
                        </span>
                    </div>
                </div>
                <div className="flex-1 flex w-full items-center justify-center py-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
