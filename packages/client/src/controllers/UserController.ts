import API, { UserAPI, UserAPIUpdatePassword } from '../api/UserAPI'
import AuthController from './AuthController'

export class UserController {
  private readonly api: UserAPI
  constructor() {
    this.api = API
  }

  // async updateProfile(data: UserAPIUpdateProfile) {
  //   try {
  //     await this.api.updateProfile(data);
  //     AuthController.fetchUser();
  //   } catch (e: any) {
  //     console.error(e);
  //   }
  // }

  async updatePassword(data: UserAPIUpdatePassword) {
    try {
      const response = await this.api.updatePassword(data)
      AuthController.fetchUser()
      return response
    } catch (e: unknown) {
      console.error(e as Error)
    }
  }

  async updateAvatar(data: FormData) {
    try {
      await this.api.updateAvatar(data)
      AuthController.fetchUser()
    } catch (e: unknown) {
      console.error(e as Error)
    }
  }
}

export default new UserController()
