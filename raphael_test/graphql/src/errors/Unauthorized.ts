import { ApolloError } from 'apollo-server'

export class UnauthorizedError extends ApolloError {
  constructor () {
    super('You are not authorized to do this operation', 'UNAUTHORIZED')

    Object.defineProperty(this, 'name', { value: 'UnauthorizedError' })
  }
}
