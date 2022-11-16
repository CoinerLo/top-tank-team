import API, { AuthAPI } from '../api/AuthAPI'
import { ISignInData, ISingUpForm } from '../typings'

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signin(data: ISignInData) {
    try {
      const response = await this.api.signIn(data)
      // await this.fetchUser()
      return response
    } catch (e: unknown) {
      console.error((e as Error).message)
    }
  }

  async signup(data: ISingUpForm) {
    try {
      const response = await this.api.signUp(data)
      await this.fetchUser()
      return response
    } catch (e: unknown) {
      console.error((e as Error).message)
    }
  }

  async fetchUser() {
    try {
      const response = await this.api.read()
      return response
    } catch (e) {
      console.error(`Ошибка: ${e}`)
    }
  }

  async logout() {
    try {
      const response = await this.api.logout()
      return response
    } catch (e: unknown) {
      console.error((e as Error).message)
    }
  }
}

export default new AuthController()
