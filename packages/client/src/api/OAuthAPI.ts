import { GetIdYandex, OAuthSingIn } from '../typings'
import { PraktikumClient } from './PraktikumClient'
import { AxiosResponse } from 'axios'

export class OAuthAPI {
  static API_URL = 'oauth'

  getId(data: string): Promise<AxiosResponse<GetIdYandex>> {
    return PraktikumClient.get(
      `${OAuthAPI.API_URL}/yandex/service-id?redirect_uri=${data}`
    )
  }

  signin(data: OAuthSingIn): Promise<AxiosResponse> {
    return PraktikumClient.post(`${OAuthAPI.API_URL}/yandex`, data)
  }
}

export default new OAuthAPI()
