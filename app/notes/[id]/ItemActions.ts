'use server'

import { Item, Note } from '@/app/types'
import { Collection, MongoClient, ObjectId } from 'mongodb'

type callback = (callback: Collection<any>) => Promise<void>

async function runOnDB(callback: callback) {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection = db.collection<Note>('notes')

    await callback(notes_collection)

    await client.close()
}

export async function toggleItemChecked(note_id: string, item_id: string, checked: boolean) {    
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection = db.collection<Note>('notes')

    await notes_collection.updateOne(
        { _id: new ObjectId(note_id), "items._id": new ObjectId(item_id) },
        { $set: { "items.$.checked": checked }}
    )

    await client.close()
}

export async function addNoteItem(note_id: string) {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017')
    const db = client.db('notes_app')
    const notes_collection = db.collection<Note>('notes')

    const new_item: Item = {
        _id: new ObjectId(),
        content: '',
        checked: false
    }

    const result = await notes_collection.updateOne(
        { _id: new ObjectId(note_id) },
        { $push: { items: new_item } }
    )

    console.log(result)

    await client.close()
}

export async function updateItemContent(note_id: string, item_id: string, content: string) {
    runOnDB(async (notes_collection: Collection<Note>) => {
        await notes_collection.updateOne(
            { _id: new ObjectId(note_id), "items._id": new ObjectId(item_id) },
            { $set: { "items.$.content": content } }
        )
    })
}

export async function deleteItem(note_id: string, item_id: string) {
    runOnDB(async (notes_collection: Collection<Note>) => {
        await notes_collection.updateOne(
            { _id: new ObjectId(note_id) },
            { $pull: { "items": { _id: new ObjectId(item_id) } } }
        )
    })
}