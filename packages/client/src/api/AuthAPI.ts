import { ISignInData, ISingUpForm } from '../typings'
import { DefaultPraktikumClient, PraktikumClient } from './PraktikumClient'

export class AuthAPI {
  static API_URL = 'auth'

  signIn(data: ISignInData): Promise<XMLHttpRequest> {
    return PraktikumClient.post(`${AuthAPI.API_URL}/signin`, data)
  }

  signUp(data: ISingUpForm): Promise<XMLHttpRequest> {
    return PraktikumClient.post(`${AuthAPI.API_URL}/signup`, data)
  }

  read(): Promise<XMLHttpRequest> {
    return DefaultPraktikumClient.get(`${AuthAPI.API_URL}/user`)
  }

  logout(): Promise<XMLHttpRequest> {
    return DefaultPraktikumClient.post(`${AuthAPI.API_URL}/logout`)
  }
}

export default new AuthAPI()
