import type { Query } from 'express-serve-static-core'

export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U
  query: T
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

export type UserType = {
  firstName: string
  lastName: string
  email: string
}

export type FindRequest = {
  id: string
}

export type CreateRequest = {
  theme: string
  ownerId: string
}

export type UpdateUserType = {
  userData: UserType
  id: string
}

export type ForumTopicType = {
  title: string
  authorName: string
  repliesCount: number
  lastReplied: string
  lastRepliedDate: string
  dateTopic: string
}

export type ForumCommentType = {
  contextId: number
  parentId: number
  postAuthor: string
  postDate: string
  comment: string
}

export type UpdateTopicType = {
  topicData: ForumTopicType
  id: number
}

export type UpdateCommentType = {
  commentData: ForumCommentType
  id: number
}
