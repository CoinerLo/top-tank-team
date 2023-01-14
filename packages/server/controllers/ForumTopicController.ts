import type Express from 'express'
import type { UpdateTopicType, ForumTopicType } from '../typings'
import type { TypedRequestBody } from '../typings'
import ForumTopicService from '../services/ForumTopicService'

export class ForumTopicController {
  public static addTopic = async (
    req: TypedRequestBody<ForumTopicType>,
    res: Express.Response
  ) => {
    const data = req.body
    const result = await ForumTopicService.create(data)
    res.end(JSON.stringify({ ...result }))
  }

  public static findAllTopic = async (res: Express.Response) => {
    const result = await ForumTopicService.findAll()
    if (!result) {
      res.status(404).json({ databaseTopicStatus: 'Not found' })
    } else {
      res.end(JSON.stringify({ ...result }))
    }
  }

  public static updateTopic = async (
    req: TypedRequestBody<UpdateTopicType>,
    res: Express.Response
  ) => {
    const { id, topicData } = req.body
    const result = await ForumTopicService.update(id, topicData)
    res.end(JSON.stringify({ ...result }))
  }
}
