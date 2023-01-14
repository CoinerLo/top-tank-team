import type Express from 'express'
import type {
  UpdateTopicType,
  ForumTopicType,
  TypedRequestBody,
  TypedRequestQuery,
  FindRequest,
} from '../typings'
import ForumTopicService from '../services/ForumTopicService'

export class ForumTopicController {
  public static addTopic = async (
    req: TypedRequestBody<ForumTopicType>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ForumTopicService.create(data)
    res.end(JSON.stringify({ databaseTopicStatus: result.dataValues }))
  }

  public static findAllTopic = async (
    _req: TypedRequestQuery<FindRequest>,
    res: Express.Response
  ) => {
    const result = await ForumTopicService.findAll()
    if (!result) {
      res.status(404).json({ databaseTopicStatus: 'Not found' })
    } else {
      res.end(JSON.stringify({ databaseTopicStatus: result }))
    }
  }

  public static updateTopic = async (
    req: TypedRequestBody<UpdateTopicType>,
    res: Express.Response
  ) => {
    const { id, topicData } = req.body
    const result = await ForumTopicService.update(id, topicData)
    res.end(JSON.stringify({ databaseTopicStatus: result?.dataValues }))
  }
}
