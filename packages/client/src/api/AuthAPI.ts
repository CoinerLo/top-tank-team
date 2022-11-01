import axios from 'axios'
import { ISignInData, ISingUpForm } from '../typings'

export class AuthAPI {
  static API_URL = 'https://ya-praktikum.tech/api/v2/auth'
  constructor() {
    axios.defaults.withCredentials = true
  }

  signIn(data: ISignInData): Promise<XMLHttpRequest> {
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return axios.post(`${AuthAPI.API_URL}/signin`, data, {
      headers: headers,
    })
  }

  signUp(data: ISingUpForm): Promise<XMLHttpRequest> {
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return axios.post(`${AuthAPI.API_URL}/signup`, data, {
      headers: headers,
    })
  }

  read(): Promise<XMLHttpRequest> {
    return axios.get(`${AuthAPI.API_URL}/user`)
  }

  logout(): Promise<XMLHttpRequest> {
    return axios.post(`${AuthAPI.API_URL}/logout`)
  }
}

export default new AuthAPI()
