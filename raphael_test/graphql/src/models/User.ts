import { Schema, model } from 'mongoose'

export interface UserInterface {
  email: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  }
})

export const User = model<UserInterface>('User', UserSchema)
