import Game from '../models/game'

class GameService {
  public async create(gameData: Game) {
    const result = await Game.create(gameData)
    return result
  }

  public async update({ game, gamerId }: Omit<Game, 'id'>) {
    await Game.update(
      {
        game,
      },
      {
        where: { gamerId },
      }
    )
  }

  public async find(gamerId: number) {
    const game = await Game.findOne({
      where: { gamerId },
    })

    return game
  }

  public async findAll(gamerId: number) {
    const games = await Game.findAll({
      where: { gamerId },
    })
    return games
  }

  public async delete(id: number) {
    await Game.destroy({
      where: { id },
    })
  }
}

export default new GameService()
