'use client'

import { useRouter, useParams } from 'next/navigation'
import { editNoteTitle } from '@/app/NoteActions'

export default function NoteTitle({ title }: { title: string }) {
    const router = useRouter()
    const params = useParams()

    let timer: NodeJS.Timeout | null = null

    async function onTitleChange(title: string) {
        if (timer)
            clearTimeout(timer)

        timer = setTimeout(async () => {
            await editNoteTitle(params.id as string, title)
            router.refresh()
        }, 500)
    }

    return (
        <input
          className='w-full bg-transparent text-center font-bold'
          type='text'
          defaultValue={title}
          onChange={(e) => onTitleChange(e.target.value)}
          onClick={(e) => { e.preventDefault() }}
        />
    )
}

