import React from 'react'
import SignupInputField from './InputField'
import SignupFormButton from './FormButton'

export default function SignupForm() {
    return (
        <div className="w-full md:max-w-[450px] mx-auto px-5 xl:px-0 flex flex-col items-center">
            <h1 className='text-xl font-semibold mb-8 text-primary'>Sign up</h1>
            <SignupInputField />
            <SignupFormButton />
            <h5 className='text-gray-500 text-[15px] font-medium'>Already have a account? <a href="/users/login" className='text-primary-light-dark transition-all duration-200 hover:text-primary'>Login</a></h5>
        </div>
    )
}
