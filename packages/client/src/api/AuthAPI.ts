import { ISignInData, ISingUpForm, IUser } from '../typings'
import { DefaultPraktikumClient, PraktikumClient } from './PraktikumClient'
import { AxiosResponse } from 'axios'

export class AuthAPI {
  static API_URL = 'auth'

  signIn(data: ISignInData): Promise<AxiosResponse<IUser>> {
    return PraktikumClient.post(`${AuthAPI.API_URL}/signin`, data)
  }

  signUp(data: ISingUpForm): Promise<AxiosResponse<IUser>> {
    return PraktikumClient.post(`${AuthAPI.API_URL}/signup`, data)
  }

  read(): Promise<AxiosResponse<IUser>> {
    return DefaultPraktikumClient.get(`${AuthAPI.API_URL}/user`)
  }

  logout(): Promise<XMLHttpRequest> {
    return DefaultPraktikumClient.post(`${AuthAPI.API_URL}/logout`)
  }
}

export default new AuthAPI()
