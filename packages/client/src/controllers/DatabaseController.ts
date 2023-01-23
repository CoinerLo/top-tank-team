import API from '../api/DatabaseAPI'
import type { DatabaseAPI } from '../api/DatabaseAPI'
import {
  CommentDBType,
  CommentUpdateDBType,
  CreateThemeType,
  TopicDBType,
  TopicUpdateDBType,
  UpdateUserDBType,
  UserDBType,
} from '../typings'

export class DatabaseController {
  private readonly api: DatabaseAPI
  constructor() {
    this.api = API
  }

  async addUserInDB(data: UserDBType) {
    const response = await this.api.addUser(data)
    return response
  }

  async findUserInDB(data: UserDBType) {
    const response = await this.api.findUser(data)
    return response
  }

  async findOrCreateUserInDB(data: UserDBType) {
    const response = await this.api.findOrCreateUser(data)
    return response
  }

  async updateUserInDB(data: UpdateUserDBType) {
    const response = await this.api.updateUser(data)
    return response
  }

  async findOrCreateUserThemeInDB(data: CreateThemeType) {
    const response = await this.api.findOrCreateUserTheme(data)
    return response
  }

  async updateUserTheme(data: CreateThemeType) {
    if (data.ownerId === 0) {
      return null
    }
    const response = await this.api.updateUserTheme(data)
    return response
  }

  // Пока не используется
  async findUserThemeInDB(id: number) {
    const response = await this.api.findTheme(id)
    return response
  }

  async addTopicInDB(data: TopicDBType) {
    const response = await this.api.addTopic(data)
    return response
  }

  async addCommentInDB(data: CommentDBType) {
    const response = await this.api.addComment(data)
    return response
  }

  async findAlltopicInDB() {
    const response = await this.api.findAlltopic()
    return response
  }

  async commentsByTopicInDB(id: number) {
    const response = await this.api.commentsByTopic(id)
    return response
  }

  async findOneTopicInDB(id: number) {
    const response = await this.api.findOneTopic(id)
    return response
  }

  async updateTopicInDB(data: TopicUpdateDBType) {
    const response = await this.api.updateTopic(data)
    return response
  }

  async updateCommentInDB(data: CommentUpdateDBType) {
    const response = await this.api.updateComment(data)
    return response
  }
}

export default new DatabaseController()
