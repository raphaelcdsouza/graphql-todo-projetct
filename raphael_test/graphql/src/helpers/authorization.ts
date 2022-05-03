import { verifyJWTToken } from './jwtToken'
import { UserRepository } from '../repositories'

export const isAuthorized = async (toDoUserId: string, token: string): Promise<boolean> => {
  const userEmail = verifyJWTToken(token)
  const user = await UserRepository.findUserByEmail({ email: userEmail })
  if (user === null || token === undefined) {
    return false
  }
  return user._id.toString() === toDoUserId
}
