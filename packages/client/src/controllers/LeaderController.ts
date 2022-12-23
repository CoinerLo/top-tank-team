import API, { ILeaderAdd, ILeaderAll, LeaderAPI } from '../api/LeaderAPI'

export class LeaderController {
  private readonly api: LeaderAPI
  constructor() {
    this.api = API
  }

  async addLeader(data: ILeaderAdd) {
    const response = await this.api.addLeader(data)
    return response
  }

  async getAllLeader(data: ILeaderAll) {
    const response = await this.api.getAllLeader(data)
    return response
  }

  async getTeamLeader(data: ILeaderAll, teamName: string) {
    const response = await this.api.getTeamLeader(data, teamName)
    return response
  }
}

export default new LeaderController()
