import { API_URL } from '../consts'
import { Router } from 'express'
import { ForumTopicController } from '../controllers/ForumTopicController'
import { ForumCommentController } from '../controllers/ForumCommentController'

export const forumRoutes = (router: Router) => {
  const forumRouter: Router = Router()

  forumRouter
    .get('/topic', ForumTopicController.findAllTopic)
    .post('/addTopic', ForumTopicController.addTopic)
    .patch('/topic', ForumTopicController.updateTopic)
    .get('/comment', ForumCommentController.findAllComment)
    .post('/addComment', ForumCommentController.addComment)
    .patch('/comment', ForumCommentController.updateComment)

  router.use(API_URL, forumRouter)
}
