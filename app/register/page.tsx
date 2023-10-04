'use client'

import { signIn } from 'next-auth/react'
import { createUser } from './actions'
import Link from 'next/link'

export default function Page() {

    async function formSubmit(formData: FormData) {
        const user = await createUser(formData)
        if (user) {
            signIn('credentials', {
                email: formData.get('email') as string,
                password: formData.get('password') as string
            })
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <div className='light:bg-amber-50 dark:bg-gray-900 dark:text-gray-500 rounded-lg min-w-[300px] max-w-[500px] mx-auto text-center '>
            <form action={formSubmit} className='mt-10 px-10 pt-5 pb-7'>
                <div className="mb-6 text-left">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" required />
                </div>
                <div className="mb-6 text-left">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6 text-left">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input type="password" id="password_confirm" name="password_confirm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">Submit</button>
            </form>
            <div className='pb-10'>
                <Link className='text-blue-300 hover:underline' href={'/login'}>Login</Link>
            </div>
        </div>
    )
}