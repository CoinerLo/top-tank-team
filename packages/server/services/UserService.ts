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
        firstName: `${userData.firstName}`,
        lastName: `${userData.lastName}`,
        email: `${userData.email}`,
      },
    })
    return result
  }

  public async findOrCreateUser(userData: UserType) {
    const [user] = await User.findOrCreate({
      where: {
        firstName: `${userData.firstName}`,
        lastName: `${userData.lastName}`,
        email: `${userData.email}`,
      },
      defaults: {
        firstName: `${userData.firstName}`,
        lastName: `${userData.lastName}`,
        email: `${userData.email}`,
      },
    })

    return user
  }
}

export default new UserService()
