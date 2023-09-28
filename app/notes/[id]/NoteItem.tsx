'use client'

import { DeleteItemButton } from './Buttons'
import { toggleItemChecked, updateItemContent } from './ItemActions'
import { useRouter, useParams } from 'next/navigation'

type props = {
    item_id: string,
    content: string,
    checked: boolean
}

export default function NoteItem({ item_id, content, checked }: props) {
    const router = useRouter()
    const params = useParams()

    const note_id = params.id as string

    let timer: NodeJS.Timeout | null = null
    
    function toggle() {
        toggleItemChecked(note_id, item_id, !checked)
        router.refresh()
    }

    function onContentChange(inputValue: string) {
        if (timer)
            clearTimeout(timer)
        
        timer = setTimeout(async () => {
            await updateItemContent(note_id, item_id, inputValue)
            router.refresh()
        }, 500)
    }

    return (
        <span className='columns-3 gap-2 w-full flex'>
            <input className='w-fit' type='checkbox' checked={checked} onChange={toggle} />
            <span className='w-full'>
                <input
                    className='w-full bg-transparent'
                    type='text'
                    defaultValue={content}
                    onChange={(e) => onContentChange(e.target.value)}
                />
            </span>
            <span className='w-fit'>
                <DeleteItemButton item_id={item_id} />
            </span>
        </span>
    )
}