import { ApolloError } from 'apollo-server'

export class BadRequestError extends ApolloError {
  constructor (message: string) {
    super(message, 'BAD REQUEST')

    Object.defineProperty(this, 'name', { value: 'BadRequestError' })
  }
}
