import Link from 'next/link'
import styles from './Notes.module.css'
import CreateNote from './CreateNote'
import { MongoClient } from 'mongodb'
import { Note } from '@/app/types'


async function getNotes() {
  const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
  const db = client.db('notes_app')
  const notes_collection =  db.collection<Note>('notes')

  const cursor = notes_collection.find({})

  if ((await notes_collection.countDocuments({})) === 0)
    console.log('No Notes')

  const notes: Note[] = []

  for await (const doc of cursor) {
    notes.push(doc)
  }

  client.close()

  return notes
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className='note'>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note, index) => {
          return <Note key={index} note={note} />
        })}
      </div>
      <br />
      <CreateNote />
    </div>
  );
}

function Note({ note }: {note: Note}) {
  const { _id, title, items, created } = note || {}

  return (
    <Link href={`/notes/${_id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5 className={styles.content}>{items?.length || 0} items</h5>
        <p className={styles.created}>{created}</p>
      </div>
    </Link>
  )
}