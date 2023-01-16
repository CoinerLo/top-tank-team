import API from '../api/DatabaseAPI'
import type { DatabaseAPI } from '../api/DatabaseAPI'
import {
  CommentDBType,
  CreateThemeType,
  TopicDBType,
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

  async topicAllInDB() {
    const response = await this.api.topicAll()
    return response
  }
}

export default new DatabaseController()
