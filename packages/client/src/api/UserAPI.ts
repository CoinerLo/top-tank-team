import axios from 'axios'
import { IChangePasswordForm } from '../components/UserProfile/Tabs/PasswordTab'

export type UserAPIUpdatePassword = Omit<IChangePasswordForm, 'repeatPassword'>

export class UserAPI {
  static API_URL = 'https://ya-praktikum.tech/api/v2/user'
  constructor() {
    axios.defaults.withCredentials = true
  }

  public updatePassword(data: UserAPIUpdatePassword): Promise<XMLHttpRequest> {
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return axios.put(`${UserAPI.API_URL}/password`, data, { headers })
  }
}

export default new UserAPI()
