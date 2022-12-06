import { ElementsCreator } from '../../../utils/canvasEngine/canvasElement'
import { accessibleGridForLanding } from '../../consts'
import {
  IDesk,
  IGamingDesk,
  GameDeskSegmentKeyType,
  VehicleOwnerType,
} from '../../types'
import { getNewGamingDesk } from '../../utils'
import { CurrentGamer } from '../Game'
import { Tank } from '../TanksDeck'
import { Vehicle } from '../Vehicle'

export class Desk {
  public gamingDesk: IGamingDesk

  constructor({ userHeadquarters, opponentHeadquarters }: IDesk) {
    const userHeadquartersSkin = new ElementsCreator({
      type: 'card',
      targetСell: 'C1',
      tankBringsResources: userHeadquarters.bringsResources,
      tankDamage: userHeadquarters.damage,
      tankHealth: userHeadquarters.health,
      tankName: userHeadquarters.name,
      tankType: userHeadquarters.type,
    })
    const opponentHeadquartersSkin = new ElementsCreator({
      type: 'card',
      targetСell: 'A5',
      tankBringsResources: opponentHeadquarters.bringsResources,
      tankDamage: opponentHeadquarters.damage,
      tankHealth: opponentHeadquarters.health,
      tankName: opponentHeadquarters.name,
      tankType: opponentHeadquarters.type,
    })
    this.gamingDesk = getNewGamingDesk(
      new Vehicle({
        vehicle: userHeadquarters,
        skin: userHeadquartersSkin,
        vehicleOwner: 'user',
      }),
      new Vehicle({
        vehicle: opponentHeadquarters,
        skin: opponentHeadquartersSkin,
        vehicleOwner: 'opponent',
      })
    )
  }

  public getGamingDesk() {
    return this.gamingDesk
  }

  isAccessibleGridForLanding(
    grid: GameDeskSegmentKeyType,
    currentGamer: CurrentGamer
  ) {
    return (
      this.gamingDesk[grid] === null &&
      accessibleGridForLanding[currentGamer].includes(grid)
    )
  }

  public addVehicleOnDesk(
    target: GameDeskSegmentKeyType,
    vehicle: Tank,
    vehicleOwner: VehicleOwnerType
  ) {
    if (
      target === 'A5' ||
      target === 'C1' ||
      this.gamingDesk[target] !== null
    ) {
      return null
    }
    const skin = new ElementsCreator({
      type: 'card',
      targetСell: target,
      tankBringsResources: vehicle.bringsResources,
      tankDamage: vehicle.damage,
      tankHealth: vehicle.health,
      tankName: vehicle.name,
      tankType: vehicle.type,
    })
    this.gamingDesk[target] = new Vehicle({ vehicle, vehicleOwner, skin })
    return this.gamingDesk
  }

  public toggleActiveVehicleOnDesk(
    target: GameDeskSegmentKeyType,
    currentGamer: CurrentGamer
  ) {
    const element = this.gamingDesk[target]
    if (element !== null && element.isYouVehicleOwner(currentGamer)) {
      element.skin.toggleActiveElementState()
      return true
    }
    return false
  }

  public moveVehicleOnDesk(
    start: GameDeskSegmentKeyType,
    target: GameDeskSegmentKeyType
  ) {
    if (
      start === 'A5' ||
      start === 'C1' ||
      this.gamingDesk[start] === null ||
      target === 'A5' ||
      target === 'C1' ||
      this.gamingDesk[target] !== null
    ) {
      return null
    }

    const isMove = this.gamingDesk[start]?.letsMove(target)
    if (isMove) {
      this.gamingDesk[target] = this.gamingDesk[start]
      this.gamingDesk[start] = null
      return this.gamingDesk
    }
    return null
  }

  public deleteVehicleOnDesk(target: GameDeskSegmentKeyType) {
    if (
      target === 'A5' ||
      target === 'C1' ||
      this.gamingDesk[target] === null
    ) {
      return null
    }
    const targetTank = this.gamingDesk[target]
    this.gamingDesk[target] = null
    return targetTank
  }

  public updateStateVehicleWhenChangingCurrentGamer(
    newCurrentGamer: CurrentGamer
  ) {
    for (const vehicleKey in this.gamingDesk) {
      const vehicle = this.gamingDesk[vehicleKey as GameDeskSegmentKeyType]
      if (vehicle !== null) {
        vehicle.updateStateWhenChangingCurrentGamer(newCurrentGamer)
      }
    }
  }
}
