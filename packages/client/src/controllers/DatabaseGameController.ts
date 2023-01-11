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
}

export default new DatabaseGameController()
