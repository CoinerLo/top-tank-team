import { AuthorizationStatus } from '../utils/consts'
import { Tank } from '../gameCore/models/TanksDeck'

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

export interface ICollectionCardItem {
  name: string
  id: string
}

export interface UserSlice {
  authorizationStatus: AuthorizationStatus
  currentUser: IUser
}

export interface DecksSlice {
  decks: {
    first: Tank[]
  }
}
