import API from '../api/DatabaseAPI'
import type { DatabaseAPI } from '../api/DatabaseAPI'
import { UserDBType } from '../typings'

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
    const responseForFind = await this.findUserInDB(data)
    if (responseForFind.data.databaseIdStatus === 'Not found') {
      const response = await this.addUserInDB(data)
      return response
    }
    return responseForFind
  }
}

export default new DatabaseController()
