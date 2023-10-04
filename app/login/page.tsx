import { _getProviders } from './actions'
import Provider from './Provider'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

export default async function Page() {
    revalidatePath('/signin')
    const providers = await _getProviders()
    return (
        <span className='block light:bg-amber-50 dark:bg-gray-900 dark:text-gray-500 rounded-lg text-center mx-auto mt-10 px-10 py-5 min-w-[300px] max-w-[500px]'>
            {Object.values(providers).map((provider) => (
                <Provider key={provider.name} provider={provider} />
            ))}
            <span className='block mt-5'>
                <Link className='text-blue-300 hover:underline' href={'/register'}>Register</Link>
            </span>
        </span>
    )
}