import { ElementsCreator } from '../../../utils/canvasEngine/canvasElement'
import { GameDeskSegmentKeyType, IVehicle } from '../../types'
import { getMaxMoves } from '../../utils'
import { CurrentGamer } from '../Game'
import { Headquarters } from '../HeadquartersDeck'

export class Vehicle {
  private vehicle
  private vehicleOwner
  private maxMoves: number
  private currentMoves: number
  private maxAttackPoints = 1
  public skin: ElementsCreator
  public currentAttackPoints = 1

  constructor({ vehicle, vehicleOwner, skin }: IVehicle) {
    this.vehicle = vehicle
    this.skin = skin
    this.vehicleOwner = vehicleOwner
    this.maxMoves =
      vehicle instanceof Headquarters ? 0 : getMaxMoves(vehicle.type)
    this.currentMoves = this.maxMoves > 1 ? 1 : 0
  }

  public getVehicleOwner() {
    return this.vehicleOwner
  }

  public isYouVehicleOwner(currentGamer: CurrentGamer) {
    return this.vehicleOwner === currentGamer
  }

  public getVehicle() {
    return this.vehicle
  }

  public getCurrentMoves() {
    return this.currentMoves
  }

  public letsMove(target: GameDeskSegmentKeyType) {
    if (this.currentMoves > 0) {
      this.currentMoves -= 1
      this.skin.moveActiveElement(target)
      return true
    }
    return false
  }

  public refreshMoves() {
    this.currentMoves = this.maxMoves
  }

  public updateStateWhenChangingCurrentGamer(newCurrentGamer: CurrentGamer) {
    if (newCurrentGamer === this.vehicleOwner) {
      this.currentMoves = this.maxMoves
      this.currentAttackPoints = this.maxAttackPoints
    }
  }
}
