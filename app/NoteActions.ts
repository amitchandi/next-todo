'use server'

import { ObjectId, MongoClient } from 'mongodb'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Note, SimpleNote } from './types'

export async function addNote() {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection =  db.collection('notes')

    const session: any = await getServerSession(authOptions)

    if (!session || !session.user_id)
        throw new Error('Invalid Session')

    const result = await notes_collection.insertOne({
        user_id: session.user_id,
        title: 'New Note',
        created: new Date(),
        items: []
    })

    if (!result.acknowledged)
        throw new Error('Could not create note')

    await client.close()
}

export async function editNoteTitle(note_id: string, newTitle: string) {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection = db.collection<Note>('notes')

    const session: any = await getServerSession(authOptions)

    if (!session || !session.user_id)
        throw new Error('Invalid Session')

    const result = await notes_collection.updateOne(
        { _id: new ObjectId(note_id) },
        { $set: { title: newTitle } }
    )

    if (!result.acknowledged)
        throw new Error('Could not create note')

    await client.close()
}