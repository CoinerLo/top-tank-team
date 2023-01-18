import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { themesRoutes } from './themesRoutes'
import { gamesRoutes } from './gamesRouters'

const router: Router = Router()

usersRoutes(router)
themesRoutes(router)
gamesRoutes(router)

export default router
