import API from '../api/DatabaseAPI'
import type { DatabaseAPI } from '../api/DatabaseAPI'
import { CreateThemeType, UserDBType } from '../typings'

export class DatabaseController {
  private readonly api: DatabaseAPI
  constructor() {
    this.api = API
  }

  async addUserInDB(data: UserDBType) {
    const response = await this.api.addUser(data)
    return response
  }

  async findUserInDB(data: UserDBType) {
    const response = await this.api.findUser(data)
    return response
  }

  async findAndAddUserInDB(data: UserDBType) {
    const response = await this.api.findOrCreateUser(data)
    return response
  }

  async findOrCreateUserThemeInDB(data: CreateThemeType) {
    const response = await this.api.findOrCreateUserTheme(data)
    return response
  }

  async updateUserTheme(data: CreateThemeType) {
    const response = await this.api.updateUserTheme(data)
    return response
  }

  // Пока не используется
  async findUserThemeInDB(id: number) {
    const response = await this.api.findTheme(id)
    return response
  }
}

export default new DatabaseController()
