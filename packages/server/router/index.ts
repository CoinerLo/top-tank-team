import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { themesRoutes } from './themesRoutes'

const router: Router = Router()

usersRoutes(router)
themesRoutes(router)

export default router
