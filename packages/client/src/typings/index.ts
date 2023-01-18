import { AuthorizationStatus, Themes } from '../utils/consts'
import { Tank } from '../gameCore/models/TanksDeck'
import { Game } from '../gameCore/models/Game'

export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string | undefined
}

export interface ISignInData {
  login: string
  password: string
}

export interface OAuthSingIn {
  code: string
  redirect_uri: string
}

export interface GetIdYandex {
  service_id: string
}

export interface ISingUpForm {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface IChangeDataForm {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface IChangeDataUser {
  data: IChangeDataForm
  databaseId: number
}

export interface ICardUpgrade {
  name: string
}

export interface UserSlice {
  authorizationStatus: AuthorizationStatus
  currentUser: IUser
  changePasswordStatus: {
    message: string
    isLoading: boolean
  }
  yandexOAuthId: string
  databaseId: number
  theme: Themes
}

export interface DecksSlice {
  decks: Record<string, Tank[]>
}

export interface GameSlice {
  game: Record<string, Game>
}

export type KeyDataGameResultType<K> = {
  title: string
  user: K
  opponent: K
}

export type DataGameResultType = {
  disposition: KeyDataGameResultType<string>
  headquarters: KeyDataGameResultType<string>
  deckStrength: KeyDataGameResultType<number>
  statistics: KeyDataGameResultType<string>
  headquartersHealth: KeyDataGameResultType<number>
  cardsInDeck: KeyDataGameResultType<number>
  resourcesSpent: KeyDataGameResultType<number>
  vehiclesDestroyed: KeyDataGameResultType<number>
  platoonsDestroyed: KeyDataGameResultType<number>
  ordersPlayed: KeyDataGameResultType<number>
}

export interface ILeaderAll {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface ILeaderAdd {
  data: {
    name: string
    ratingTopTank1: number
  }
  ratingFieldName: string
  teamName: string
}

export type ILeader = Omit<ILeaderAdd, 'ratingFieldName' | 'teamName'>

export interface ILeadersSlice {
  leaders: Array<ILeader>
}

export interface RatingCellProps {
  rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
}

export interface ICreateData {
  name: string
  rating: RatingCellProps['rating']
}

export type UserDBType = {
  firstName: string
  lastName: string
  email: string
}

export type AxiosResponseUserApiType = Record<
  'databaseUserStatus',
  number | string
>

export type AxiosResponseUserThemeApiType = Record<
  'databaseThemeStatus',
  string
>

export type AxiosResponseTopicApiType = Record<'databaseTopicStatus', ITopic>

export type AxiosResponseCommentApiType = Record<
  'databaseCommentStatus',
  IComment
>

export type AxiosResponseTopicAllApiType = Record<
  'databaseTopicStatus',
  Array<ITopic>
>

export type AxiosResponseCommentAllApiType = Record<
  'databaseCommentStatus',
  Array<IComment>
>

export type CreateThemeType = {
  theme: string
  ownerId: number
}

export type UpdateUserDBType = {
  userData: UserDBType
  id: number
}

export type TopicDBType = {
  title: string
  authorName: string
  repliesCount: number
  lastReplied: string
  lastRepliedDate: string
  dateTopic: string
}

export interface ITopic extends TopicDBType {
  id: number
}

export type TopicUpdateDBType = {
  id: number
  topicData: TopicDBType
}

export type CommentDBType = {
  contextId: number
  parentId: number
  postAuthor: string
  postDate: string
  comment: string
}

export interface IComment extends CommentDBType {
  id: number
}

export type CommentUpdateDBType = {
  id: number
  commentData: CommentDBType
}

export type PostDBType = {
  topic: string
  comment: string
  authorName: string
  successCb?: () => void
}

export type addCommentDBType = {
  id: number
  comment: string
  authorName: string
  parentId: number
  successCb?: () => void
}

export interface IForumSlice {
  topic: Array<ITopic>
  comment: Array<IComment>
}
