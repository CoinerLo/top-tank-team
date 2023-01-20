import ForumComment from '../models/forumComment'

class ForumCommentService {
  public async create(commentData: ForumComment) {
    const result = await ForumComment.create(commentData)
    return result
  }

  public async findAllByTopic(topicID: number) {
    const result = await ForumComment.findAll({
      where: { contextId: topicID },
    })
    return result
  }

  public async update(
    topicID: number,
    { contextId, parentId, postAuthor, postDate, comment }: ForumComment
  ) {
    await ForumComment.update(
      {
        contextId,
        parentId,
        postAuthor,
        postDate,
        comment,
      },
      {
        where: { id: topicID },
      }
    )

    const result = ForumComment.findOne({
      where: { id: topicID },
    })

    return result
  }
}

export default new ForumCommentService()
