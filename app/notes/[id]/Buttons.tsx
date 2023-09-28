'use client'

import IconButton from '@/components/IconButton'
import { FaPlusCircle, FaMinusCircle} from 'react-icons/fa'
import { addNoteItem, deleteItem } from './ItemActions'
import { useRouter, useParams } from 'next/navigation'

export function AddButton() {
    const router = useRouter()
    const params = useParams()

    const note_id = params.id as string

    async function callback() {
        await addNoteItem(note_id)
        router.refresh()
    }

    return (
        <IconButton Icon={FaPlusCircle} callback={callback} title='Add Item' className='bg-amber-50 rounded-full' />
    )
}

export function DeleteItemButton({ item_id }: { item_id: string }) {
    const router = useRouter()
    const params = useParams()

    const note_id = params.id as string

    async function callback() {
        await deleteItem(note_id, item_id)
        router.refresh()
    }

    return (
        <IconButton Icon={FaMinusCircle} callback={callback} title='Delete Item' className='bg-amber-50 rounded-full' />
    )
}