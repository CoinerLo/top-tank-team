import { UserState } from '../UserState'
import { GameDeskSegmentKeyType, IGameSave, IUserData } from '../../types'
import { Desk } from '../Desk'
import { getRandomInt } from '../../utils'
import { Tank } from '../TanksDeck'
import { operationConst, endGameMessage } from '../../consts'

export enum CurrentGamer {
  user = 'user',
  opponent = 'opponent',
}

interface IGame {
  userData: IUserData
  opponentData: IUserData
}

export class Game {
  public id!: number
  private UserState: UserState
  private OpponentState: UserState
  private isEndGame = false
  private winner: '' | CurrentGamer = ''
  public endTheGameMessage = ''
  public Desk: Desk
  public currentGamer: CurrentGamer

  constructor(gameData: IGame | IGameSave) {
    if (Object.hasOwn(gameData, 'Desk')) {
      const {
        Desk: deskSave,
        OpponentState: opponentStateSave,
        UserState: userStateSave,
        currentGamer,
        id,
      } = gameData as IGameSave
      this.id = id
      this.currentGamer = currentGamer
      this.UserState = new UserState(userStateSave)
      this.OpponentState = new UserState(opponentStateSave)
      this.Desk = new Desk(deskSave)
    } else {
      const { userData, opponentData } = gameData as IGame
      this.UserState = new UserState(userData)
      this.OpponentState = new UserState(opponentData)
      this.Desk = new Desk({
        userHeadquarters: this.UserState.getHeadquarters(),
        opponentHeadquarters: this.OpponentState.getHeadquarters(),
      })
      this.currentGamer =
        getRandomInt(2) > 0 ? CurrentGamer.user : CurrentGamer.opponent
    }
  }

  public setId(id: number) {
    this.id = id
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

  public cardAttack(
    attacker: GameDeskSegmentKeyType,
    attackTarget: GameDeskSegmentKeyType
  ) {
    const resultAttack = this.Desk.cardAttack(attacker, attackTarget)
    if (resultAttack) {
      resultAttack.forEach(vehicle => {
        if (vehicle) {
          const vehicleBringsResources = vehicle.getVehicle().bringsResources
          const vehicleOwner = vehicle.getVehicleOwner()
          const gamerState =
            vehicleOwner === CurrentGamer.user
              ? this.UserState
              : this.OpponentState
          gamerState.updateFutureСountResources(
            operationConst.dec,
            vehicleBringsResources
          )
          gamerState.putCardIntoDiscardPile(vehicle.getVehicle())
          const opponentState =
            vehicleOwner === CurrentGamer.user
              ? this.OpponentState
              : this.UserState
          opponentState.updateCountVehiclesDestroyed(1)
        }
      })
      this.Desk.toggleActiveVehicleOnDesk(attacker, this.currentGamer)
    }
    if (attackTarget === 'A5' || attackTarget === 'C1') {
      const targetHeadquartersHealth =
        this.Desk.getHeadquartersHealth(attackTarget)
      if (
        targetHeadquartersHealth !== undefined &&
        targetHeadquartersHealth < 1
      ) {
        this.isEndGame = true
        const headquartersOwner =
          this.Desk.gamingDesk[attackTarget]?.getVehicleOwner()
        this.winner =
          headquartersOwner === CurrentGamer.user
            ? CurrentGamer.opponent
            : CurrentGamer.user
        this.endTheGameMessage = endGameMessage.headquartersDestroyed
      }
    }
    return !!resultAttack
  }

  public addVehicleOnDesk(
    target: GameDeskSegmentKeyType,
    currentGamer: CurrentGamer,
    activeCardInHand: string
  ) {
    const currentGamerState =
      currentGamer === CurrentGamer.user ? this.UserState : this.OpponentState
    const newTankOnDesk =
      currentGamerState.bringingEquipmentToBattlefield(activeCardInHand)

    if (newTankOnDesk && newTankOnDesk instanceof Tank) {
      this.Desk.addVehicleOnDesk(target, newTankOnDesk, currentGamer)
      return true
    }
    return false
  }

  public changeCurrentGamer() {
    if (this.currentGamer === CurrentGamer.user) {
      this.currentGamer = CurrentGamer.opponent
      this.UserState.endActionGamer()
      const resultStartActionGamer = this.OpponentState.startActionGamer()
      if (!resultStartActionGamer) {
        this.isEndGame = true
        this.winner = CurrentGamer.user
        this.endTheGameMessage = endGameMessage.noCardsInDeck
        return false
      }
    } else {
      this.currentGamer = CurrentGamer.user
      this.OpponentState.endActionGamer()
      const resultStartActionGamer = this.UserState.startActionGamer()
      if (!resultStartActionGamer) {
        this.isEndGame = true
        this.winner = CurrentGamer.opponent
        this.endTheGameMessage = endGameMessage.noCardsInDeck
        return false
      }
    }
    this.Desk.updateStateVehicleWhenChangingCurrentGamer(this.currentGamer)
    return this.currentGamer
  }

  public isEndOfThisGame() {
    return this.isEndGame
  }

  public getWinnerName() {
    const gamerState =
      this.winner === CurrentGamer.user ? this.UserState : this.OpponentState
    return gamerState.getUserName()
  }

  public endGameWithWhiteFlag() {
    this.isEndGame = true
    this.endTheGameMessage = endGameMessage.withWhiteFlag
    this.winner =
      this.currentGamer === CurrentGamer.user
        ? CurrentGamer.opponent
        : CurrentGamer.user
  }

  public saveGame(): IGameSave {
    return {
      id: this.id,
      currentGamer: this.currentGamer,
      UserState: this.UserState.saveGame(),
      OpponentState: this.OpponentState.saveGame(),
      Desk: { gamingDesk: this.Desk.gameSave() },
    }
  }
}
