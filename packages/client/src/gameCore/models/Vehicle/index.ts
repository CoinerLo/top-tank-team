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
  private maxCounterattackPoints: number
  private maxHealth: number
  public currentHealth: number
  public currentAttackPoints = 1
  public currentCounterattackPoints: number
  public currentDamage: number
  public skin: ElementsCreator

  constructor({ vehicle, vehicleOwner, skin }: IVehicle) {
    this.vehicle = vehicle
    this.skin = skin
    this.vehicleOwner = vehicleOwner
    this.maxMoves =
      vehicle instanceof Headquarters ? 0 : getMaxMoves(vehicle.type)
    this.currentMoves = this.maxMoves > 1 ? 1 : 0
    this.maxHealth = vehicle.health
    this.currentHealth = this.maxHealth
    this.currentDamage = vehicle.damage
    this.maxCounterattackPoints =
      vehicle instanceof Headquarters || vehicle.type === 'САУ' ? 0 : 1
    this.currentCounterattackPoints = this.maxAttackPoints
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

  public getVehicleType() {
    return this.vehicle.type
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
      this.currentCounterattackPoints = this.maxCounterattackPoints
    }
  }

  public returnAttackPoints() {
    this.currentAttackPoints = this.maxAttackPoints
  }

  public resolveAttack(
    attacker: GameDeskSegmentKeyType,
    attackTarget: GameDeskSegmentKeyType
  ) {
    if (this.currentAttackPoints < 1) {
      return false
    }
    const tankType = this.getVehicleType()

    if (
      tankType !== 'САУ' &&
      !(this.vehicle instanceof Headquarters) &&
      (Math.abs(Number(attacker[1]) - Number(attackTarget[1])) > 1 ||
        (attacker[0] === 'A' && attackTarget[0] === 'C') ||
        (attacker[0] === 'C' && attackTarget[0] === 'A'))
    ) {
      return false
    }
    this.currentAttackPoints -= 1
    return true
  }

  public resolveCounterattack() {
    if (this.currentCounterattackPoints > 0) {
      this.currentCounterattackPoints -= 1
      return true
    }
    return false
  }

  public takeDamage(points: number) {
    if (points >= this.currentHealth) {
      this.currentHealth = 0
      return false
    }
    this.currentHealth -= points
    this.skin.changeHealth(this.currentHealth)
    return true
  }
}
