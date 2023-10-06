import styles from './Id.module.css'
import { MongoClient, ObjectId } from 'mongodb'
import Link from 'next/link'
import { FaGithub, FaRegArrowAltCircleLeft } from 'react-icons/fa'
import NoteItem from './NoteItem'
import { Note } from '@/app/types'
import { AddButton } from './Buttons'
import LocalClientDate from '@/components/LocalClientDate'
import NoteTitle from './NoteTitle'
import Image from 'next/image'

async function getNote(noteId: string) {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017')
  const db = client.db('notes_app')
  const notes_collection = db.collection<Note>('notes')

  const note = await notes_collection.findOne({ _id: new ObjectId(noteId) })

  await client.close()

  if (!note)
    throw new Error('invalid note id')
  return note
}

export default async function NotePage({ params }: { params: { id: string } }) {
  let note = await getNote(params.id)

  note.items?.forEach(item => {
    (item._id as any) = item._id.toString()
  })

  return (
    <div className='mt-5'>
      <div className='grid grid-cols-3'>
        <div className='justify-self-center bg-amber-50 rounded-full w-fit h-fit'>
          <Link href={`/`} prefetch={false}>
            <FaRegArrowAltCircleLeft size={25} />
          </Link>
        </div>
        <div></div>
        <div className='justify-self-end w-40 bg-amber-50 rounded-lg text-center'>
          <Link className='inline-flex items-center font-medium hover:underline' href='https://github.com/amitchandi/next-todo' target='_blank' >
              <FaGithub />
              <span className='pl-1 underline font-bold'>GitHub Repo</span>
          </Link>
        </div>
      </div>
      <div className={styles.note}>
        <Image className='mx-auto' src={'/new_pin.png'} alt='pin.png' width={25} height={25} />
        <NoteTitle title={note.title} />
        <ul>
          {note.items?.map((item, index) => {
            return (
              <li key={index}>
                <NoteItem item_id={item._id.toString()} content={item.content} checked={item.checked} />
              </li>
            )
          })}
        </ul>
        <span className='block mx-auto w-fit mt-2'>
          <AddButton />
        </span>
        <LocalClientDate date={note.created} style={styles.created} />
      </div>
    </div>
  )
}