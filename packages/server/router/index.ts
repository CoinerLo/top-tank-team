import { Router } from 'express'
import { usersRoutes } from './usersRoutes'

const router: Router = Router()

usersRoutes(router)

export default router
