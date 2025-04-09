'use client'

import { LoginFormAction } from '@/actions/LoginForm'
import React from 'react'

export default function LoginFormButton() {

    const { handleLoginForm } = LoginFormAction()

    return (
        <button onClick={handleLoginForm} className='block my-8 w-full bg-primary-light rounded-md px-3 py-3 text-center focus:outline-none focus:ring-0 text-[15px] tracking-wide text-white font-medium transition-colors duration-200 hover:bg-primary'>Login</button>
    )
}
