import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { themesRoutes } from './themesRoutes'
import { gamesRoutes } from './gamesRouters'
import { forumRoutes } from './forumRoutes'

const router: Router = Router()

usersRoutes(router)
themesRoutes(router)
gamesRoutes(router)
forumRoutes(router)

export default router
