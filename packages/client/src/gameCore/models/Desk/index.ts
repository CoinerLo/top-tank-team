import { IDesk, IGamingDesk } from '../../types'
import { getNewGamingDesk } from '../../utils'

export class Desk {
  public gamingDesk: IGamingDesk

  constructor({ userHeadquarters, opponentHeadquarters }: IDesk) {
    this.gamingDesk = getNewGamingDesk(userHeadquarters, opponentHeadquarters)
  }

  public getGamingDesk() {
    return this.gamingDesk
  }
}
