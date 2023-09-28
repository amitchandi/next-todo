'use client'

import IconButton from '@/components/IconButton'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import { DeleteNote } from './DeleteNote'
import { useRouter } from 'next/navigation'
import { addNote } from './NoteActions'

export function DeleteNoteButton({ note_id }: { note_id: string }) {
    const router = useRouter()
    async function callback(e: any) {
        e.preventDefault()
        await DeleteNote(note_id)
        router.refresh()
    }
    return <IconButton title='Delete Note' Icon={FaTrashAlt} callback={callback} className='shadow-xl' />
}

export function AddNoteButton() {
    const router = useRouter()
    async function callback() {
        await addNote()
        router.refresh()
    }
    return <IconButton title='Add Note' Icon={FaPlusCircle} callback={callback} size={1.5} className='bg-amber-50 rounded-full shadow-xl' />
}