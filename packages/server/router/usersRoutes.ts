import { API_URL } from '../consts'
import { UserController } from '../controllers/UserController'
import { Router } from 'express'

export const usersRoutes = (router: Router) => {
  const usersRouter: Router = Router()

  usersRouter
    .get('/user', UserController.findUser)
    .post('/user', UserController.findOrCreateUser)
    .post('/adduser', UserController.addUser)

  router.use(API_URL, usersRouter)
}
