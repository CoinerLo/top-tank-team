import API, { OAuthAPI } from '../api/OAuthAPI'
import { OAuthSingIn } from '../typings'

export class OAuthController {
  private readonly api: OAuthAPI

  constructor() {
    this.api = API
  }

  async getYandexId(data: string) {
    const response = await this.api.getId(data)
    return response
  }

  async signinYandex(data: OAuthSingIn) {
    await this.api.signin(data)
  }
}

export default new OAuthController()
