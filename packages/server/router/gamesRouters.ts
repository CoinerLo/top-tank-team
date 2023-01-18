import { GameController } from '../controllers/GameController'
import { API_URL } from '../consts'

import { Router } from 'express'

export const gamesRoutes = (router: Router) => {
  const gamesRouter: Router = Router()

  gamesRouter
    .get('/game/all', GameController.findAllGames)
    .get('/game', GameController.findGame)
    .post('/game', GameController.createGame)
    .patch('/game', GameController.updateGame)
    .delete('/game', GameController.deleteGame)

  router.use(API_URL, gamesRouter)
}
