import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { themesRoutes } from './themesRoutes'
import { forumRoutes } from './forumRoutes'

const router: Router = Router()

usersRoutes(router)
themesRoutes(router)
forumRoutes(router)

export default router
