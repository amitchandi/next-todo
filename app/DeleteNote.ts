'use server'

import { ObjectId, MongoClient } from 'mongodb'

export async function DeleteNote(note_id: string) {
    const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection =  db.collection('notes')
    
    const result = await notes_collection.deleteOne({ _id: new ObjectId(note_id) })
    
    if (!result.acknowledged)
        throw new Error('Could not delete note with id: ' + note_id)
    
    await client.close()    
}