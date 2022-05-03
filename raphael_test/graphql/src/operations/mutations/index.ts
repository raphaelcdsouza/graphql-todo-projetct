import { createJWTToken, verifyJWTToken } from '../../helpers'
import { ToDoRepository, UserRepository } from '../../repositories'
import { ToDoInterface } from '../../models'
import { BadRequestError, UnauthorizedError } from '../../errors'

const isAuthorized = async (toDoUserId: string, token: string): Promise<boolean> => {
  const userEmail = verifyJWTToken(token)
  const user = await UserRepository.findUserByEmail({ email: userEmail })
  if (user === null || token === undefined) {
    return false
  }
  return user._id.toString() === toDoUserId
}

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

const updateToDo = async (_: any, { id, title, description, category }: any, context: any): Promise<ToDoInterface> => {
  const toDoFound = await ToDoRepository.findToDoById(id)
  if (toDoFound === null) {
    throw new BadRequestError('ToDo not found')
  }
  if (!(await isAuthorized(toDoFound.user.toString(), context.token))) {
    throw new UnauthorizedError()
  }
  const toDo = await ToDoRepository.updateToDo(toDoFound, { title, description, category })
  return toDo
}

const deleteToDo = async (_: any, { id }: any, context: any): Promise<boolean> => {
  const toDoFound = await ToDoRepository.findToDoById(id)
  if (toDoFound === null) {
    throw new BadRequestError('ToDo not found')
  }
  if (!(await isAuthorized(toDoFound.user.toString(), context.token))) {
    throw new UnauthorizedError()
  }
  await ToDoRepository.deleteToDo(id)
  return true
}

export const mutations = { login, createToDo, updateToDo, deleteToDo }
