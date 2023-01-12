import Game from '../models/game'

class GameService {
  public async create(gameData: Game) {
    const result = await Game.create(gameData)
    return result
  }

  public async update({ game, id }: Game) {
    await Game.update(
      {
        game: game,
      },
      {
        where: { id },
      }
    )
  }

  public async find(id: number) {
    const game = await Game.findByPk(id)

    return game
  }

  public async delete(id: number) {
    await Game.destroy({
      where: { id },
    })
  }
}

export default new GameService()
