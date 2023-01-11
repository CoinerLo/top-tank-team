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

export type CreateThemeType = {
  theme: string
  ownerId: number
}

export type UpdateUserDBType = {
  userData: UserDBType
  id: number
}
