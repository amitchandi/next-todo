'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function UserInfo() {
    const { data: session }: any = useSession()
    if (session) {
      return (
        <div className='grid'>
            <div className='justify-self-end text-right'>
                <span className='text-black font-bold bg-amber-50 rounded-lg '>
                    Provider: {session?.provider}, Email: {session?.user?.email} <br />
                </span>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => signOut()}>Sign out</button>
            </div>
        </div>
      )
    }
    return <></>
  }