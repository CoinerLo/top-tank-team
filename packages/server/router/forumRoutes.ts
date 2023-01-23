import { API_URL } from '../consts'
import { Router } from 'express'
import { ForumTopicController } from '../controllers/ForumTopicController'
import { ForumCommentController } from '../controllers/ForumCommentController'

export const forumRoutes = (router: Router) => {
  const forumRouter: Router = Router()

  forumRouter
    .get('/topics', ForumTopicController.findAllTopic)
    .get('/topic', ForumTopicController.findOneTopic)
    .post('/topic', ForumTopicController.addTopic)
    .patch('/topic', ForumTopicController.updateTopic)
    .get('/comment', ForumCommentController.findAllCommentByTopic)
    .post('/comment', ForumCommentController.addComment)
    .patch('/comment', ForumCommentController.updateComment)

  router.use(API_URL, forumRouter)
}
