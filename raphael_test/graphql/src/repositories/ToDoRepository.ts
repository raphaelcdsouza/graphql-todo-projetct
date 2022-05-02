import { ToDo, ToDoInterface } from '../models'

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
}
