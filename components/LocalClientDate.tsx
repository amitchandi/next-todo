'use client'

export default function LocalClientDate({ date, style }: { date: Date, style?: string }) {
    return (
        <span suppressHydrationWarning className={style}>
            {date.toLocaleString()}
        </span>
    )
}