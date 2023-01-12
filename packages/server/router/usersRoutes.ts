import { API_URL } from '../consts'
import { UserController } from '../controllers/UserController'
import { Router } from 'express'

export const usersRoutes = (router: Router) => {
  const usersRouter: Router = Router()

  usersRouter
    .post('/adduser', UserController.addUser)
    .get('/finduser', UserController.findUser)

  router.use(API_URL, usersRouter)
}
