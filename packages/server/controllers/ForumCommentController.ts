import type Express from 'express'
import type { ForumCommentType, UpdateCommentType } from '../typings'
import type { TypedRequestBody } from '../typings'
import ForumCommentService from '../services/ForumCommentService'

export class ForumCommentController {
  public static addComment = async (
    req: TypedRequestBody<ForumCommentType>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ForumCommentService.create(data)
    res.end(JSON.stringify({ ...result }))
  }

  public static findAllComment = async (res: Express.Response) => {
    const result = await ForumCommentService.findAll()
    if (!result) {
      res.status(404).json({ databaseTopicStatus: 'Not found' })
    } else {
      res.end(JSON.stringify({ ...result }))
    }
  }

  public static updateComment = async (
    req: TypedRequestBody<UpdateCommentType>,
    res: Express.Response
  ) => {
    const { id, commentData } = req.body
    const result = await ForumCommentService.update(id, commentData)
    res.end(JSON.stringify({ ...result }))
  }
}
