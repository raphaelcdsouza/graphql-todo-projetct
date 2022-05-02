import { User, UserInterface } from '../models'

export class UserRepository {
  static model = User

  static async findOrCreateUser ({ email }: { email: string }): Promise<UserInterface> {
    let user = await UserRepository.model.findOne({ email })
    if (user === null) {
      user = await UserRepository.model.create({ email })
    }
    return user
  }

  static async findUserByEmail ({ email }: { email: string }): Promise<UserInterface | null> {
    return await UserRepository.model.findOne({ email })
  }
}
