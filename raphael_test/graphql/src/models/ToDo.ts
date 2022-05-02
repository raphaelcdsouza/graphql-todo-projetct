import { Schema, model } from 'mongoose'

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
  }
})

export const ToDo = model('ToDo', ToDoSchema)
