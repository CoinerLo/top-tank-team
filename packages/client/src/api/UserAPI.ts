import { IChangePasswordForm } from '../components/UserProfile/Tabs/PasswordTab'
import { DefaultPraktikumClient, PraktikumClient } from './PraktikumClient'

export type UserAPIUpdatePassword = Omit<IChangePasswordForm, 'repeatPassword'>

export class UserAPI {
  static API_URL = 'user'

  public updatePassword(data: UserAPIUpdatePassword): Promise<XMLHttpRequest> {
    return PraktikumClient.put(`${UserAPI.API_URL}/password`, data)
  }

  public updateAvatar(data: FormData): Promise<XMLHttpRequest> {
    return DefaultPraktikumClient.put(`${UserAPI.API_URL}/profile/avatar`, data)
  }
}

export default new UserAPI()
