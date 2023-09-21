'use client'

import IconButton from '@/components/IconButton'
import { FaRegEdit } from 'react-icons/fa'

export default function EditButton() {

    async function asd(e: any) {
        console.log(e)
    }

    return <IconButton Icon={FaRegEdit} callback={asd} />
}