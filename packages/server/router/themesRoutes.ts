import { ThemeController } from '../controllers/ThemeController'
import { API_URL } from '../consts'
import { Router } from 'express'

export const themesRoutes = (router: Router) => {
  const themesRoutes: Router = Router()

  themesRoutes
    .post('/theme', ThemeController.findOrCreateUserTheme)
    .get('/theme', ThemeController.findUserTheme)
    .patch('/theme', ThemeController.updateUserTheme)

  router.use(API_URL, themesRoutes)
}
