import forumComment from '../models/forumComment'
import type { ForumCommentType } from '../typings'

class ForumCommentService {
  public async create(commentData: ForumCommentType) {
    const result = await forumComment.create(commentData)
    return result
  }

  public async findAll() {
    const result = await forumComment.findAll()
    return result
  }

  public async findAllByTopic(topicID: number) {
    const result = await forumComment.findAll({
      where: { contextId: topicID },
    })
    return result
  }

  public async update(
    topicID: number,
    { contextId, parentId, postAuthor, postDate, comment }: ForumCommentType
  ) {
    await forumComment.update(
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

    const result = forumComment.findOne({
      where: { id: topicID },
    })

    return result
  }
}

export default new ForumCommentService()
