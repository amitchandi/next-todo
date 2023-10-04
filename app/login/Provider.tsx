'use client'

import { signIn } from 'next-auth/react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { useState } from 'react'

export default function Provider({ provider }: any) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    async function submit(e: any) {
        e.preventDefault()
        signIn('credentials', {
            email,
            password
        })
    }

    if (provider.name === 'Credentials') {
        return (
            <span className='block' key={provider.name}>
                <form>
                    <span className='block text-left'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} id='email' name='email' type='email' className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </span>
                    <span className='block text-left'>
                        <label htmlFor='password' className='mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} id='password' name='password' type='password' className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </span>
                    <button
                        className='flex relative justify-center mb-1 px-4 py-3 w-full rounded-lg border border-stone-50 mt-5
                        focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
                        dark:bg-gray-900 dark:hover:bg-gray-700
                        light:bg-amber-50 light:hover:bg-amber-100'
                        onClick={(e) => submit(e)}
                    >
                        Sign in with {provider.name}
                    </button>
                </form>
                <span className="relative flex py-5 items-center">
                    <span className="flex-grow border-t border-gray-400"></span>
                    <span className="flex-shrink mx-4 text-gray-400">or</span>
                    <span className="flex-grow border-t border-gray-400"></span>
                </span>
            </span>
        )
    }
    
    return (
        <span key={provider.name} className='mt-2 block'>
            <button
                className='flex relative justify-center mb-1 px-4 py-3 w-full rounded-lg border border-stone-50
                focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
                dark:bg-gray-900 dark:hover:bg-gray-700
                light:bg-amber-50 light:hover:bg-amber-100'
                onClick={() => signIn(provider.id)}
            >
                {Icon(provider.name)}
                <span className='ml-2'>Sign in with {provider.name}</span>
            </button>
        </span>
    )
}

function Icon(providerName: string) {
    if (providerName === 'Google')
        return <FaGoogle />
    if (providerName === 'Github')
        return <FaGithub />
}