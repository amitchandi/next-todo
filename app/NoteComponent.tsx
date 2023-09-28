'use client'

import { DeleteNoteButton } from './NoteButtons'
import { SimpleNote } from '@/app/types'
import styles from './Notes.module.css'
import LocalClientDate from '@/components/LocalClientDate'
import Link from 'next/link'
import Image from 'next/image'
import { editNoteTitle } from './NoteActions'
import { useRouter } from 'next/navigation'

export default function NoteComponent({ note }: { note: SimpleNote }) {
    const router = useRouter()
    
    const { _id, title, items, created } = note || {}

    let timer: NodeJS.Timeout | null = null

    function onTitleChange(title: string) {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(async () => {
            await editNoteTitle(note._id, title)
            router.refresh()
        }, 500)
    }

    return (
        <Link href={`/notes/${_id}`} prefetch={false}>
            <div className={styles.note}>
                <Image className='mx-auto' src={'/new_pin.png'} alt='pin.png' width={25} height={25} />
                <input
                    className='w-full bg-transparent text-center font-bold'
                    type='text'
                    defaultValue={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    onClick={(e) => { e.preventDefault() }}
                />
                <h5 className={styles.content}>{items?.length || 0} items</h5>
                <span className='flex justify-end'>
                    <LocalClientDate date={created} style={styles.created} />
                    <span className='ml-2'>
                        <DeleteNoteButton note_id={_id.toString()} />
                    </span>
                </span>
            </div>
        </Link>
    )
}