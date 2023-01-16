import type Express from 'express'
import type {
  FindRequest,
  ForumCommentType,
  TypedRequestBody,
  TypedRequestQuery,
  UpdateCommentType,
} from '../typings'
import ForumCommentService from '../services/ForumCommentService'

export class ForumCommentController {
  public static addComment = async (
    req: TypedRequestBody<ForumCommentType>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ForumCommentService.create(data)
    res.end(JSON.stringify({ databaseCommentStatus: result.dataValues }))
  }

  public static findAllComment = async (
    _req: TypedRequestQuery<FindRequest>,
    res: Express.Response
  ) => {
    const result = await ForumCommentService.findAll()
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
