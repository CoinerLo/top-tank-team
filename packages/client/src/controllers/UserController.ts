import API, { UserAPI, UserAPIUpdatePassword } from '../api/UserAPI'
import AuthController from './AuthController'
import { IChangeDataForm } from '../typings'

export class UserController {
  private readonly api: UserAPI
  constructor() {
    this.api = API
  }

  async updateProfile(data: IChangeDataForm) {
    const response = await this.api.updateProfile(data)
    AuthController.fetchUser()
    return response
  }

  async updatePassword(data: UserAPIUpdatePassword) {
    try {
      const response = await this.api.updatePassword(data)
      AuthController.fetchUser()
      if (response?.status == 200) {
        return true
      }
      return false
    } catch (e: unknown) {
      console.error(e as Error)
    }
  }

  async updateAvatar(data: FormData) {
    const response = await this.api.updateAvatar(data)
    AuthController.fetchUser()
    return response
  }
}

export default new UserController()
