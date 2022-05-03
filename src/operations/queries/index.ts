import { ToDoInterface } from '../../models'
import { ToDoRepository } from '../../repositories'

const listToDos = async (_: any, { title, description, categories, email }: any): Promise<ToDoInterface[]> => {
  return ToDoRepository.listToDos({ title, description, categories, email })
}

export const queries = { listToDos }
