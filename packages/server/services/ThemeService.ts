import type { CreateThemeRequest, FindRequest } from '../typings'
import UserTheme from '../models/userTheme'

class ThemeService {
  public async find({ id }: FindRequest) {
    const userTheme = await UserTheme.findByPk(id)
    return userTheme
  }

  public async findOrCreate(data: UserTheme) {
    const [userTheme] = await UserTheme.findOrCreate({
      where: {
        ownerId: data.ownerId,
      },
      defaults: data,
    })
    return userTheme
  }

  public async update(data: CreateThemeRequest) {
    await UserTheme.update(
      {
        theme: data.theme,
      },
      {
        where: { ownerId: data.ownerId },
      }
    )

    const result = await UserTheme.findOne({
      where: { ownerId: data.ownerId },
    })

    return result
  }
}

export default new ThemeService()
