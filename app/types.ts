import { ObjectId } from 'mongodb'

export type Note = {
  _id: ObjectId
  user_id: ObjectId
  title: string
  items: Item[]
  created: string
}

export type Item = {
  id: number
  content: string
  checked: boolean
}