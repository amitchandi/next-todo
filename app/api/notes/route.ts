import { NextResponse } from 'next/server'
import * as sqlite3 from 'sqlite3'

export default function GET() {
    const db = new sqlite3.Database('./db/notes.db', (err) => {
        if (err)
            console.log(err.message)
        console.log('Connected to the notes database')
    })

    
}