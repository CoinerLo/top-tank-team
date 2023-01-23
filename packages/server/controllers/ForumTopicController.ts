import type Express from 'express'
import type ForumTopic from '../models/forumTopic'
import type {
  UpdateTopicType,
  TypedRequestBody,
  TypedRequestQuery,
  FindRequest,
} from '../typings'
import ForumTopicService from '../services/ForumTopicService'

export class ForumTopicController {
  public static addTopic = async (
    req: TypedRequestBody<ForumTopic>,
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

  public static findOneTopic = async (
    req: TypedRequestQuery<FindRequest>,
    res: Express.Response
  ) => {
    const data = req.query
    const { id } = data
    const result = await ForumTopicService.findOne(Number(id))
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
