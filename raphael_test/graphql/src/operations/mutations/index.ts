import { createJWTToken } from '../../helpers'
import { UserRepository } from '../../repositories'
import { ToDo } from '../../models'

const login = async (_: any, { email }: any): Promise<string> => {
  const user = await UserRepository.findOrCreateUser({ email })
  const token = createJWTToken(user.email)
  return `Bearer ${token}`
}

const createToDo = async (_: any, __: any, context: any): Promise<string> => {
  const token = context.token
  const toDo = new ToDo({
    name: 'A fazer',
    description: 'Tarefas a fazer',
    category: 'Done'
  })
  await toDo.save()
  return token
}

export const mutations = { createToDo, login }
