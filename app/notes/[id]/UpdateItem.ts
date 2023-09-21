'use server'

import { Item, Note } from '@/app/types'
import { MongoClient, ObjectId } from 'mongodb'
import { redirect, RedirectType } from 'next/navigation'

export const toggleItemChecked = async (note_id: string, item: Item) => {
    
    const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection =  db.collection<Note>('notes')
    const result = await notes_collection.findOne({ _id: new ObjectId(note_id) })

    if (!result)
        throw new Error('Note does not exist.')

    result.items.forEach(_item => {
        if (_item.id === item.id)
            _item.checked = !_item.checked
    })
    await notes_collection.updateOne(
        { _id: new ObjectId(note_id) },
        { $set: { items: result.items }}
    )

    client.close()
}