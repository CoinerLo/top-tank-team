import User from '../models/user'
import type { UserType } from '../typings'

class UserService {
  public async create(userData: UserType) {
    const result = await User.create(userData)
    return result
  }

  public async find(userData: UserType) {
    const result = await User.findOne({
      where: {
        firstName: `${userData.firstName}`,
        lastName: `${userData.lastName}`,
        email: `${userData.email}`,
      },
    })
    return result
  }

  public async findOrCreate(userData: UserType) {
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

  public async update(
    userID: string,
    { firstName, lastName, email }: UserType
  ) {
    await User.update(
      {
        firstName,
        lastName,
        email,
      },
      {
        where: { id: Number(userID) },
      }
    )

    const result = await User.findOne({
      where: { id: Number(userID) },
    })

    return result
  }
}

export default new UserService()
