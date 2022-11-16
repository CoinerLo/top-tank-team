import { IChangePasswordForm } from '../components/UserProfile/Tabs/PasswordTab'
import { DefaultPraktikumClient, PraktikumClient } from './PraktikumClient'
import { IChangeDataForm, IUser } from '../typings'
import { AxiosResponse } from 'axios'

export type UserAPIUpdatePassword = Omit<IChangePasswordForm, 'repeatPassword'>

export class UserAPI {
  static API_URL = 'user'

  public updateProfile(data: IChangeDataForm): Promise<AxiosResponse<IUser>> {
    return PraktikumClient.put(`${UserAPI.API_URL}/profile`, data)
  }

  public updatePassword(data: UserAPIUpdatePassword): Promise<XMLHttpRequest> {
    return PraktikumClient.put(`${UserAPI.API_URL}/password`, data)
  }

  public updateAvatar(data: FormData): Promise<AxiosResponse<IUser>> {
    return DefaultPraktikumClient.put(`${UserAPI.API_URL}/profile/avatar`, data)
  }
}

export default new UserAPI()
