import type Express from 'express'
import GameService from '../services/GameService'
import type Game from '../models/game'
import type { TypedRequestBody, TypedRequestQuery } from '../typings'

export class GameController {
  public static createGame = async (
    req: TypedRequestBody<Game>,
    res: Express.Response
  ) => {
    const data = req.body
    const game = await GameService.create(data)
    res.end(JSON.stringify({ databaseGameStatus: game.dataValues }))
  }

  public static updateGame = async (
    req: TypedRequestBody<Omit<Game, 'id'>>,
    res: Express.Response
  ) => {
    const data = req.body
    await GameService.update(data)
    const game = await GameService.find(data.gamerId)
    res.end(JSON.stringify({ databaseGameStatus: game }))
  }

  public static findGame = async (
    req: TypedRequestQuery<{ id: string }>,
    res: Express.Response
  ) => {
    const { id } = req.query
    const game = await GameService.find(Number(id))
    if (!game) {
      res.status(404).json({ databaseGameStatus: 'Not found' })
    } else {
      res.end(JSON.stringify({ databaseGameStatus: game.dataValues }))
    }
  }

  public static findAllGames = async (
    req: TypedRequestQuery<{ id: string }>,
    res: Express.Response
  ) => {
    const { id } = req.query
    const game = await GameService.findAll(Number(id))
    if (!game) {
      res.status(404).json({ databaseGameStatus: 'Not found' })
    } else {
      res.end(JSON.stringify({ databaseGameStatus: game }))
    }
  }

  public static deleteGame = async (
    req: TypedRequestQuery<{ id: string }>,
    res: Express.Response
  ) => {
    const { id } = req.query
    await GameService.delete(Number(id))
    res.end(JSON.stringify({ databaseGameStatus: id }))
  }
}
