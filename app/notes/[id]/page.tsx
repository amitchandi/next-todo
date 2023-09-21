import styles from '../Notes.module.css'
import { MongoClient, ObjectId } from 'mongodb'
import Link from 'next/link'
import { FaBackward, FaRegArrowAltCircleLeft } from 'react-icons/fa'
import NoteItem from './NoteItem'
import { Note } from '@/app/types'
import EditButton from './EditButton'


async function getNote(noteId: string) {
  const client = new MongoClient(process.env.uri || 'mongodb://127.0.0.1:27017')
  const db = client.db('notes_app')
  const notes_collection =  db.collection<Note>('notes')
  
  const note = await notes_collection.findOne({_id: new ObjectId(noteId)})

  client.close()

  if (!note)
    throw new Error('invalid note id')
  return note
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id)
  return (
    <>
      <Link href={`/notes`}>
        <FaRegArrowAltCircleLeft />
      </Link>
      <div className={styles.note}>
        <EditButton />
        <h3>{note.title}</h3>
        <ul>
          {note.items?.map((item, index) => {
            return (
              <li key={index}>
                <NoteItem note_id={params.id} item={item} />
              </li>
            )
          })}
        </ul>
        <p className={styles.created}>{note.created}</p>
      </div>
    </>
  )
}