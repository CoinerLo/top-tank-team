import type { AxiosResponse } from 'axios'
import { ServerClient } from './ServerClient'
import { AxiosResponseGameApiType, GameDBType } from '../typings'

export class DatabaseGameAPI {
  static API_URL = 'api/v1/game'

  public createGame(
    data: Omit<GameDBType, 'id'>
  ): Promise<AxiosResponse<AxiosResponseGameApiType>> {
    return ServerClient.post(DatabaseGameAPI.API_URL, data)
  }
}

export default new DatabaseGameAPI()
