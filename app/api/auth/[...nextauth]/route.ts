import NextAuth, { Awaitable, RequestInternal, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { MongoClient, WithId } from 'mongodb'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        authorize: async function (credentials: any, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<any> {
            // Add logic here to look up the user from the credentials supplied

            const result = await validateCredentals(credentials.username, credentials.password)

            if (!result.valid)
                return null
            
            return result.user
        }
    }),
    GithubProvider({
        name: 'Github',
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    })
  ]
})

type ValidationResults = {
    valid: boolean,
    user?: any
}

async function validateCredentals(username: string, password: string) : Promise<ValidationResults> {
    const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
    try {
        const database = client.db('GIT_DAMN')
        const users = database.collection('users')
        const query = { username }
        const result = await users.findOne(query)
        if (!result)
            return { valid: false }
        else {
            var match = await bcrypt.compare(password, result.password)
            if (match)
                return {
                    valid: true,
                    user: result
                }
            else 
                return { valid: false }
        }
    } catch (err) {
        console.log(err)
        return { valid: false }
    } finally {
        await client.close()
    }
}

export { handler as GET, handler as POST }