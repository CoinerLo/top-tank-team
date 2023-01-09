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
