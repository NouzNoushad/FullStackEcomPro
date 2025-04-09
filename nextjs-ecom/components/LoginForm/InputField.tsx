'use client'

import { useLoginStore } from '@/context/Store/LoginStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function LoginInputField() {

    const { email, password, setEmail, setPassword, errors } = useLoginStore()

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log('/////// token: ', token)

        if (token) {
            router.push('/products')
        } else {
            router.push('/users/login')
        }
    }, [router])

    return (
        <div className="md:space-y-5 space-y-3 w-full">
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
