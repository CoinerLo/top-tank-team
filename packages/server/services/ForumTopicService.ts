import ForumTopic from '../models/forumTopic'

class ForumTopicService {
  public async create(topicData: ForumTopic) {
    const result = await ForumTopic.create(topicData)
    return result
  }

  public async findAll() {
    const result = await ForumTopic.findAll()
    return result
  }

  public async findOne(topicID: number) {
    const result = await ForumTopic.findOne({
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
    }: ForumTopic
  ) {
    await ForumTopic.update(
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

    const result = ForumTopic.findOne({
      where: { id: topicID },
    })

    return result
  }
}

export default new ForumTopicService()
