import type { CreateRequest, FindRequest } from '../typings'
import UserTheme from '../models/userTheme'
import type { NullishPropertiesOf } from 'sequelize/types/utils'

class ThemeService {
  public async find({ id }: FindRequest) {
    const userTheme = UserTheme.findByPk(id)
    return userTheme
  }

  public async findOrCreate(data: CreateRequest) {
    const [userTheme] = await UserTheme.findOrCreate({
      where: {
        ownerId: data.ownerId,
      },
      defaults: {
        ownerId: Number(data.ownerId),
        theme: data.theme,
      } as Omit<UserTheme, NullishPropertiesOf<UserTheme>>,
    })
    return userTheme
  }

  public async update(data: CreateRequest) {
    await UserTheme.update(
      {
        theme: data.theme,
      },
      {
        where: { ownerId: data.ownerId },
      }
    )

    const result = UserTheme.findOne({
      where: { ownerId: data.ownerId },
    })

    return result
  }
}

export default new ThemeService()
