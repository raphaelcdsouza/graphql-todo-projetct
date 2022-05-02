import { ToDo, ToDoInterface } from '../models'

const buildFiltersObject = ({ categories, title, description }: { categories?: string[], title?: string, description?: string }): any => {
  const builtFilterObject: any = {}
  if (title !== undefined) {
    Object.assign(builtFilterObject, { title })
  }
  if (description !== undefined) {
    Object.assign(builtFilterObject, { description })
  }
  if (categories !== undefined && categories.length > 0) {
    Object.assign(builtFilterObject, { category: { $in: categories } })
  }
  return builtFilterObject
}

const buildPopulateObject = (email?: string): any => {
  const builtPopulateObject: any = {
    path: 'user',
    select: '-__v -_id'
  }
  if (email !== undefined) {
    Object.assign(builtPopulateObject, { match: { email } })
  }
  return builtPopulateObject
}

export class ToDoRepository {
  static model = ToDo

  static async createToDo ({ title, description, category, user }: Partial<ToDoInterface>): Promise<ToDoInterface> {
    return this.model.create({
      title,
      description,
      category,
      user
    })
  }

  static async listToDos ({ email, ...rest }: { categories?: string[], title?: string, description?: string, email?: string }): Promise<ToDoInterface[]> {
    const toDos: any[] = await this.model
      .find(buildFiltersObject(rest), '-__v')
      .populate(buildPopulateObject(email))
      .lean()
    const filteredTodos = toDos.filter(({ user }) => user !== null)
    return filteredTodos
  }
}
