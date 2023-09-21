'use client'

import { IconType } from 'react-icons';

export default function IconButton({ Icon, callback }: { Icon: IconType, callback: Function }) {
    return <button onClick={(e) => callback(e)}>
        <Icon />
    </button>
}