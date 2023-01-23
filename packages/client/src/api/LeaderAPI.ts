import { PraktikumClient } from './PraktikumClient'
import { AxiosResponse } from 'axios'
import { ILeaderAdd, ILeaderAll } from '../typings'

export class LeaderAPI {
  static API_URL = 'leaderboard'

  public addLeader(data: ILeaderAdd): Promise<AxiosResponse> {
    return PraktikumClient.post(`${LeaderAPI.API_URL}`, data)
  }

  public getAllLeader(data: ILeaderAll): Promise<AxiosResponse> {
    return PraktikumClient.post(`${LeaderAPI.API_URL}/all`, data)
  }

  public getTeamLeader(
    data: ILeaderAll,
    teamName: string
  ): Promise<AxiosResponse> {
    return PraktikumClient.post(`${LeaderAPI.API_URL}/${teamName}`, data)
  }
}

export default new LeaderAPI()
