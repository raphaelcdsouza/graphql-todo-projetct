import { Schema, model } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface UserInterface {
  _id: ObjectId
  email: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  }
})

export const User = model<UserInterface>('User', UserSchema)
