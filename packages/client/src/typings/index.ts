import { AuthorizationStatus } from '../utils/consts'
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
}

export interface DecksSlice {
  decks: Record<string, Tank[]>
}

export interface GameSlice {
  game: Record<string, Game>
}
