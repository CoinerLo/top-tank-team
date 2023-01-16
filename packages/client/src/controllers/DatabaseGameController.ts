import API from '../api/DatabaseGameAPI'
import type { DatabaseGameAPI } from '../api/DatabaseGameAPI'
import { GameDBType } from '../typings'

export class DatabaseGameController {
  private readonly api: DatabaseGameAPI
  constructor() {
    this.api = API
  }

  async createNewGame(data: Omit<GameDBType, 'id'>) {
    const response = await this.api.createGame(data)
    return response
  }

  async findGame(id: number) {
    const response = await this.api.findGame(id)
    return response
  }

  async updateGame(data: Omit<GameDBType, 'id'>) {
    const response = await this.api.updateGame(data)
    return response
  }

  async deleteGame(id: number) {
    const response = await this.api.deleteGame(id)
    return response
  }

  async findAllGames(id: number) {
    const response = await this.api.findAllGames(id)
    return response
  }
}

export default new DatabaseGameController()
