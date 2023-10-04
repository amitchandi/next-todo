import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith@domain.com" },
                password: { label: "password", type: "password" }
            },
            authorize: async function (credentials: any) {
                // Add logic here to look up the user from the credentials supplied
                const result = await validateCredentals(credentials.email, credentials.password)
                
                if (!result)
                    return null

                return result
            }
        }),
        GithubProvider({
            name: 'Github',
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            name: 'Google',
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            // console.log(token, account, profile)
            if (account) {
                (token as any).provider = account.provider;
                (token as any).type = account.type;
            }
            // console.log(token)
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            if (token.provider === 'github' || token.provider === 'google' || token.provider === 'credentials') {
                (session as any).user_id = token.sub;
                (session as any).provider = token.provider;
            }
            //need to grab userid from mongodb and store
            // console.log(session, token, user)
            return session
        },
        async redirect({ url, baseUrl }) {
            return '/'
        },
    },
    pages: {
        signIn: '/login',

    }
}

const handler = NextAuth(authOptions)

async function validateCredentals(email: string, password: string): Promise<User | undefined> {
    const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
    try {
        const database = client.db('notes_app')
        const users = database.collection('users')
        const query = { email }
        const result = await users.findOne(query)
        if (!result)
            return
        else {
            var match = await bcrypt.compare(password, result.password)
            if (match) {
                return  {
                    id: result._id.toJSON(),
                    email: result.email,
                }
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

export { handler as GET, handler as POST }