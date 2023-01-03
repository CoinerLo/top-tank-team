import User from '../models/user'
import type { UserType } from '../typings'

class UserService {
  public async addUser(userData: UserType) {
    const result = await User.create(userData)
    return result
  }

  public async findUser(userData: UserType) {
    const result = await User.findOne({
      where: {
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    })
    return result
  }
}

export default new UserService()
