import { UserState } from '../UserState'
import { IUserData } from '../../types'
import { Desk } from '../Desk'
import { getRandomInt, nanoid } from '../../utils'

enum CurrentGamer {
  user = 'user',
  opponent = 'opponent',
}

interface IGame {
  userData: IUserData
  opponentData: IUserData
  id?: string
}

export class Game {
  public id: string
  private UserState: UserState
  private OpponentState: UserState
  public Desk: Desk
  public currentGamer: CurrentGamer

  constructor({ userData, opponentData, id }: IGame) {
    this.id = id ?? nanoid()
    this.UserState = new UserState(userData)
    this.OpponentState = new UserState(opponentData)
    this.Desk = new Desk({
      userHeadquarters: this.UserState.getHeadquarters(),
      opponentHeadquarters: this.OpponentState.getHeadquarters(),
    })
    this.currentGamer =
      getRandomInt(2) > 0 ? CurrentGamer.user : CurrentGamer.opponent
  }

  public getFullState() {
    return {
      id: this.id,
      userState: this.UserState,
      opponentState: this.OpponentState,
      deskState: this.Desk,
    }
  }

  public getDesk() {
    return this.Desk
  }

  public getUserState() {
    return this.UserState
  }

  public getOpponentState() {
    return this.OpponentState
  }
}
