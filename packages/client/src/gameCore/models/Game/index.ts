import { UserState } from '../UserState'
import { GameDeskSegmentKeyType, IUserData } from '../../types'
import { Desk } from '../Desk'
import { getRandomInt, nanoid } from '../../utils'
import { Tank } from '../TanksDeck'
import { operationConst } from '../../consts'

export enum CurrentGamer {
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
  private isEndGame = false
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
        console.log('Конец игре') // Здесь начинается следующая задача - Написать концовку игры
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
      this.OpponentState.startActionGamer()
    } else {
      this.currentGamer = CurrentGamer.user
      this.OpponentState.endActionGamer()
      this.UserState.startActionGamer()
    }
    this.Desk.updateStateVehicleWhenChangingCurrentGamer(this.currentGamer)
    return this.currentGamer
  }

  public isEndOfThisGame() {
    return this.isEndGame
  }
}
