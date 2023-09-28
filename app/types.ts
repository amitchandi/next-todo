import { ObjectId } from 'mongodb'

export type Note = {
  _id: ObjectId
  user_id: ObjectId
  title: string
  items: Item[]
  created: Date
}

export type SimpleNote = {
  _id: string
  user_id: string
  title: string
  items: SimpleItem[]
  created: Date
}

export type Item = {
  _id: ObjectId
  content: string
  checked: boolean
}

export type SimpleItem = {
  _id: string
  content: string
  checked: boolean
}