import {
  AxiosResponseCommentApiType,
  AxiosResponseTopicAllApiType,
  AxiosResponseTopicApiType,
  AxiosResponseUserApiType,
  AxiosResponseUserThemeApiType,
  CommentDBType,
  CommentUpdateDBType,
  CreateThemeType,
  IComment,
  TopicDBType,
  TopicUpdateDBType,
  UpdateUserDBType,
  UserDBType,
} from '../typings'
import type { AxiosResponse } from 'axios'
import { ServerClient } from './ServerClient'

export class DatabaseAPI {
  static API_URL = 'api/v1'

  public addUser(
    data: UserDBType
  ): Promise<AxiosResponse<AxiosResponseUserApiType>> {
    return ServerClient.post(`${DatabaseAPI.API_URL}/adduser`, data)
  }

  public findUser(
    data: UserDBType
  ): Promise<AxiosResponse<AxiosResponseUserApiType>> {
    return ServerClient.get(
      `${DatabaseAPI.API_URL}/user?lastName=${data.lastName}&firstName=${data.firstName}&email=${data.email}`
    )
  }

  public findOrCreateUser(
    data: UserDBType
  ): Promise<AxiosResponse<AxiosResponseUserApiType>> {
    return ServerClient.post(`${DatabaseAPI.API_URL}/user`, data)
  }

  public updateUser(
    data: UpdateUserDBType
  ): Promise<AxiosResponse<AxiosResponseUserApiType>> {
    return ServerClient.patch(`${DatabaseAPI.API_URL}/user`, data)
  }

  public findTheme(
    id: number
  ): Promise<AxiosResponse<AxiosResponseUserThemeApiType>> {
    return ServerClient.get(`${DatabaseAPI.API_URL}/theme?id=${id}`)
  }

  public findOrCreateUserTheme(
    data: CreateThemeType
  ): Promise<AxiosResponse<AxiosResponseUserThemeApiType>> {
    return ServerClient.post(`${DatabaseAPI.API_URL}/theme`, data)
  }

  public updateUserTheme(
    data: CreateThemeType
  ): Promise<AxiosResponse<AxiosResponseUserThemeApiType>> {
    return ServerClient.patch(`${DatabaseAPI.API_URL}/theme`, data)
  }

  public addTopic(
    data: TopicDBType
  ): Promise<AxiosResponse<AxiosResponseTopicApiType>> {
    return ServerClient.post(`${DatabaseAPI.API_URL}/topic`, data)
  }

  public addComment(
    data: CommentDBType
  ): Promise<AxiosResponse<AxiosResponseCommentApiType<IComment>>> {
    return ServerClient.post(`${DatabaseAPI.API_URL}/comment`, data)
  }

  public topicAll(): Promise<AxiosResponse<AxiosResponseTopicAllApiType>> {
    return ServerClient.get(`${DatabaseAPI.API_URL}/topics`)
  }

  public commentAll(): Promise<AxiosResponse<AxiosResponseTopicAllApiType>> {
    return ServerClient.get(`${DatabaseAPI.API_URL}/comments`)
  }

  public commentsByTopic(
    id: number
  ): Promise<AxiosResponse<AxiosResponseCommentApiType<IComment[]>>> {
    return ServerClient.get(`${DatabaseAPI.API_URL}/comment?id=${id}`)
  }

  public topicOne(
    id: number
  ): Promise<AxiosResponse<AxiosResponseTopicApiType>> {
    return ServerClient.get(`${DatabaseAPI.API_URL}/topic?id=${id}`)
  }

  public updateTopic(
    data: TopicUpdateDBType
  ): Promise<AxiosResponse<AxiosResponseTopicApiType>> {
    return ServerClient.patch(`${DatabaseAPI.API_URL}/topic`, data)
  }

  public updateComment(
    data: CommentUpdateDBType
  ): Promise<AxiosResponse<AxiosResponseCommentApiType<IComment>>> {
    return ServerClient.patch(`${DatabaseAPI.API_URL}/comment`, data)
  }
}

export default new DatabaseAPI()
