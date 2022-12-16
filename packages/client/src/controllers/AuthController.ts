import API, { AuthAPI } from '../api/AuthAPI'
import { ISignInData, ISingUpForm } from '../typings'

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signin(data: ISignInData) {
    const response = await this.api.signIn(data)
    return response
  }

  async signup(data: ISingUpForm) {
    const response = await this.api.signUp(data)
    return response
  }

  async fetchUser() {
    const response = await this.api.read()
    return response
  }

  async logout() {
    const response = await this.api.logout()
    return response
  }
}

export default new AuthController()
