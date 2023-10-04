'use server'

import { getProviders } from 'next-auth/react'

export async function _getProviders() {
    const providers = await getProviders() ?? []
    return providers
}