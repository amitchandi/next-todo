'use client'

import { Item } from '@/app/types'
import { toggleItemChecked } from './UpdateItem'
import { useRouter } from 'next/navigation'

export default function NoteItem({ note_id, item }: { note_id: string, item: Item }) {
    const router = useRouter()
    
    function toggle() {
        toggleItemChecked(note_id, item)
        router.refresh()
    }
    return (
        <>
            <input type='checkbox' checked={item.checked} onChange={toggle} />
            {item.content}
        </>
    )
}