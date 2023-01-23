import type Express from 'express'
import type ForumComment from '../models/forumComment'
import type {
  FindRequest,
  TypedRequestBody,
  TypedRequestQuery,
  UpdateCommentType,
} from '../typings'
import ForumCommentService from '../services/ForumCommentService'

export class ForumCommentController {
  public static addComment = async (
    req: TypedRequestBody<ForumComment>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ForumCommentService.create(data)
    res.end(JSON.stringify({ databaseCommentStatus: result.dataValues }))
  }

  public static findAllCommentByTopic = async (
    req: TypedRequestQuery<FindRequest>,
    res: Express.Response
  ) => {
    const data = req.query
    const { id } = data
    const result = await ForumCommentService.findAllByTopic(Number(id))
    if (!result) {
      res.status(404).json({ databaseCommentStatus: 'Not found' })
    } else {
      res.end(JSON.stringify({ databaseCommentStatus: result }))
    }
  }

  public static updateComment = async (
    req: TypedRequestBody<UpdateCommentType>,
    res: Express.Response
  ) => {
    const { id, commentData } = req.body
    const result = await ForumCommentService.update(id, commentData)
    res.end(JSON.stringify({ databaseCommentStatus: result?.dataValues }))
  }
}
