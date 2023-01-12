import { UserDBType } from '../typings'
import type { AxiosResponse } from 'axios'
import { ServerClient } from './ServerClient'

export class DatabaseAPI {
  static API_URL = 'api/v1'

  public addUser(
    data: UserDBType
  ): Promise<AxiosResponse<Record<'databaseIdStatus', number | string>>> {
    return ServerClient.post(`${DatabaseAPI.API_URL}/adduser`, data)
  }

  public findUser(
    data: UserDBType
  ): Promise<AxiosResponse<Record<'databaseIdStatus', number | string>>> {
    return ServerClient.get(
      `${DatabaseAPI.API_URL}/finduser?lastName=${data.lastName}&firstName=${data.firstName}`
    )
  }
}

export default new DatabaseAPI()
