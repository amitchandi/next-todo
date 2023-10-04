'use server'

import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

export async function createUser(formData: FormData): Promise<any> {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const password_confirm = formData.get('password_confirm') as string

    if (!email || !password)
        return false

    if (password !== password_confirm)
        return false
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    try {
        const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
        const db = client.db('notes_app')
        const notes_collection = db.collection('users')
    
        const user = await notes_collection.insertOne({
            email: email,
            password: hashedPassword
        })
        await client.close()
        return user
    } catch (err) {
        console.log(err)
        return false
    }
}