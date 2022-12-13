import API, { OAuthAPI } from '../api/OAuthAPI'
import { OAuthSingIn } from '../typings'

export class OAuthController {
  private readonly api: OAuthAPI

  constructor() {
    this.api = API
  }

  async yandexGetId(data: string) {
    const response = await this.api.yandexGetId(data)
    return response
  }

  async yandexSignin(data: OAuthSingIn) {
    await this.api.yandexSignin(data)
  }
}

export default new OAuthController()
