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
    select: '-__v'
  }
  if (email !== undefined) {
    Object.assign(builtPopulateObject, { match: { email } })
  }
  return builtPopulateObject
}

const buildUpdatedObject = (originalObject: ToDoInterface, { category, description, title }: Partial<ToDoInterface>): ToDoInterface => {
  const updatedObject = { ...originalObject }
  if (category !== undefined) {
    Object.assign(updatedObject, { category })
  }
  if (description !== undefined) {
    Object.assign(updatedObject, { description })
  }
  if (title !== undefined) {
    Object.assign(updatedObject, { title })
  }
  return updatedObject
}

export class ToDoRepository {
  static model = ToDo

  static async findToDoById (id: string): Promise<ToDoInterface | null> {
    return this.model.findById(id).lean()
  }

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

  static async updateToDo (toDo: ToDoInterface, { title, description, category }: Partial<ToDoInterface>): Promise<ToDoInterface> {
    const updatedToDoObject = buildUpdatedObject(toDo, { title, description, category })
    await this.model.updateOne({ _id: toDo._id }, updatedToDoObject).lean()
    return updatedToDoObject
  }
}
