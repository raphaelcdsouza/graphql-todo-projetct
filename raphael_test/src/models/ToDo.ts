import { Schema, model } from 'mongoose'
import { ObjectId } from 'mongodb'
export interface ToDoInterface {
  _id: ObjectId
  title: string
  description: string
  category: string
  user: ObjectId
}

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export const ToDo = model<ToDoInterface>('ToDo', ToDoSchema)
