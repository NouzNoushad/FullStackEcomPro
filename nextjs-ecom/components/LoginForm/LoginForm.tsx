import React from 'react'
import LoginInputField from './InputField'
import LoginFormButton from './FormButton'

export default function LoginForm() {
    return (
        <div className="w-full md:max-w-[450px] mx-auto px-5 xl:px-0 flex flex-col items-center">
            <h1 className='text-xl font-semibold mb-8 text-primary'>Login</h1>
            <LoginInputField />
            <a href='#' className='mt-3 self-end text-end text-primary-light-dark font-semibold text-sm transition-all duration-200 hover:text-primary'>Forget password ?</a>
            <LoginFormButton />
            <h5 className='text-gray-500 text-[15px] font-medium'>Not a memeber yet? <a href="/users/sign-up" className='text-primary-light-dark transition-all duration-200 hover:text-primary'>Sign up</a></h5>
        </div>
    )
}
