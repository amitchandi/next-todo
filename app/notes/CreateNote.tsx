import { RedirectType, redirect } from 'next/navigation'
import { MongoClient, ObjectId } from 'mongodb'
import { Note } from '@/app//types'

export default async function CreateNote() {
    const create = async(formData: FormData) => {
        'use server'
        
        const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
        const db = client.db('notes_app')
        const notes_collection =  db.collection('notes')

        const result = await notes_collection.insertOne({
            user_id: new ObjectId('650b8affd1d673fc61399ae5'), //need to get user id from login
            title: formData.get('title'),
            created: new Date().toLocaleString()
        })

        if (!result.acknowledged)
            throw new Error('did not work')

        client.close()
        redirect('/notes', RedirectType.replace)
    }

    return (
        <form method='POST' action={create}>
            <h3>Create a new Note</h3>
            <input
                type='text'
                name='title'
                placeholder='Title'
                required
            />
            <button type='submit'>
                Create Note
            </button>
        </form>
    )
}