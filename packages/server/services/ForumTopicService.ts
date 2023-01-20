import forumTopic from '../models/forumTopic'
import type { ForumTopicType } from '../typings'

class ForumTopicService {
  public async create(topicData: ForumTopicType) {
    const result = await forumTopic.create(topicData)
    return result
  }

  public async findAll() {
    const result = await forumTopic.findAll()
    return result
  }

  public async findOne(topicID: number) {
    const result = await forumTopic.findOne({
      where: { id: topicID },
    })
    return result
  }

  public async update(
    topicID: number,
    {
      title,
      authorName,
      repliesCount,
      lastReplied,
      lastRepliedDate,
      dateTopic,
    }: ForumTopicType
  ) {
    await forumTopic.update(
      {
        title,
        authorName,
        repliesCount,
        lastReplied,
        lastRepliedDate,
        dateTopic,
      },
      {
        where: { id: topicID },
      }
    )

    const result = forumTopic.findOne({
      where: { id: topicID },
    })

    return result
  }
}

export default new ForumTopicService()
