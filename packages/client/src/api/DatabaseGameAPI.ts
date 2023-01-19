import type { AxiosResponse } from 'axios'
import { ServerClient } from './ServerClient'
import { AxiosResponseGameApiType, GameDBType } from '../typings'

export class DatabaseGameAPI {
  static API_URL = 'api/v1/game'

  public createGame(
    data: Omit<GameDBType, 'id'>
  ): Promise<AxiosResponse<AxiosResponseGameApiType<GameDBType>>> {
    return ServerClient.post(DatabaseGameAPI.API_URL, data)
  }

  public findGame(
    id: number
  ): Promise<AxiosResponse<AxiosResponseGameApiType<GameDBType>>> {
    return ServerClient.get(`${DatabaseGameAPI.API_URL}?id=${id}`)
  }

  public updateGame(
    data: Omit<GameDBType, 'id'>
  ): Promise<AxiosResponse<AxiosResponseGameApiType<GameDBType>>> {
    return ServerClient.patch(DatabaseGameAPI.API_URL, data)
  }

  public deleteGame(
    id: number
  ): Promise<AxiosResponse<AxiosResponseGameApiType<number>>> {
    return ServerClient.delete(`${DatabaseGameAPI.API_URL}?id=${id}`)
  }

  public findAllGames(
    id: number
  ): Promise<AxiosResponse<AxiosResponseGameApiType<GameDBType[]>>> {
    return ServerClient.get(`${DatabaseGameAPI.API_URL}/all?id=${id}`)
  }
}

export default new DatabaseGameAPI()
