'use client'

import { useSignupStore } from '@/context/Store/SignupStore'
import React from 'react'

export default function SignupInputField() {
    const { name, email, password, setName, setEmail, setPassword, errors } = useSignupStore()
    return (
        <div className="md:space-y-5 space-y-3 w-full">
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm border-inherit ${errors?.full_name ? 'border-red-500' : 'border-inherit'}`} placeholder='Full Name' />
                {errors?.full_name && <p className='text-xs text-red-500 mt-2'>{errors.full_name}</p>}
            </div>
            <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm border-inherit ${errors?.email ? 'border-red-500' : 'border-inherit'}`} placeholder='Email' />
                {errors?.email && <p className='text-xs text-red-500 mt-2'>{errors.email}</p>}
            </div>
            <div>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className={`border w-full px-2 py-3 rounded-md placeholder:text-[13.5px] focus:outline-none focus:ring-0 text-sm border-inherit ${errors?.password ? 'border-red-500' : 'border-inherit'}`} placeholder='Password' />
                {errors?.password && errors.password.map((error, index) => (
                    <p className='text-xs text-red-500 mt-2' key={index}>{error}</p>
                ))}
            </div>
        </div>
    )
}
