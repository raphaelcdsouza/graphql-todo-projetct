import { createJWTToken, verifyJWTToken } from '../../helpers'
import { ToDoRepository, UserRepository } from '../../repositories'
import { ToDoInterface } from '../../models'
import { UnauthorizedError } from '../../errors'

const login = async (_: any, { email }: any): Promise<string> => {
  const user = await UserRepository.findOrCreateUser({ email })
  const token = createJWTToken(user.email)
  return `Bearer ${token}`
}

const createToDo = async (_: any, { title, description, category }: any, context: any): Promise<ToDoInterface> => {
  const token = context.token
  const userEmail = verifyJWTToken(token)
  const user = await UserRepository.findUserByEmail({ email: userEmail })
  if (user === null || token === undefined) {
    throw new UnauthorizedError()
  }
  const toDo = await ToDoRepository.createToDo({ title, description, category, user: user._id })
  return toDo
}

export const mutations = { createToDo, login }
