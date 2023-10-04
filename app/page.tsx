import styles from './Notes.module.css'
import { MongoClient } from 'mongodb'
import { Note, SimpleItem, SimpleNote } from '@/app/types'
import { AddNoteButton } from './NoteButtons'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import NoteComponent from './NoteComponent'
import { revalidateTag } from 'next/cache'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'

async function getNotes() {
  'use server'
  revalidateTag('/')
  const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
  const db = client.db('notes_app')
  const notes_collection =  db.collection<Note>('notes')

  const session: any = await getServerSession(authOptions)

  const cursor = notes_collection.find({
    user_id: session.user_id
  })

  const notes: SimpleNote[] = []

  for await (const doc of cursor) {
    const items: SimpleItem[] = doc.items?.map((item: any) => item._id = item._id.toString())
    const simpleNote: SimpleNote = {
      _id: doc._id.toString(),
      user_id: doc.user_id.toString(),
      title: doc.title,
      items: items,
      created: doc.created,
    }
    notes.push(simpleNote)
  }

  client.close()

  return notes
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className='mt-5'>
      <div className='grid grid-cols-3'>
        <div></div>
        <div className='justify-self-center text-black font-bold bg-amber-50 rounded-lg w-20 text-center'>Notes</div>
        <div className='justify-self-end w-40 bg-amber-50 rounded-lg text-center'>
          <Link className='inline-flex items-center font-medium hover:underline' href='https://github.com/amitchandi/next-todo' target='_blank' >
              <FaGithub />
              <span className='pl-1 underline font-bold'>GitHub Repo</span>
          </Link>
        </div>
      </div>
      <div className={styles.grid}>
        {notes?.map((note, index) => {
          return <NoteComponent key={index} note={note} />
        })}
        <div className={styles.note}>
          <span className='block mx-auto w-fit mt-8'>
            <AddNoteButton />
          </span>
        </div>
      </div>
    </div>
  );
}