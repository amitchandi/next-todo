'use client'

import { IconType } from 'react-icons'

type props = {
    Icon: IconType,
    callback: Function,
    title?: string,
    size?: number,
    color?: string,
    className?: string
}

export default function IconButton({ Icon, callback, title, size, color, className }: props) {
    return (
        <button title={title} onClick={(e) => callback(e)} className={className}>
            <Icon size={(size ? size : '1') + 'em'} color={color} />
        </button>
    )
}