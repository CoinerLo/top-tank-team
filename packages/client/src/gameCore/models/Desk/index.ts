import { ElementsCreator } from '../../../utils/canvasEngine/canvasElement'
import { accessibleGridForLanding, listPositions } from '../../consts'
import {
  IDesk,
  IGamingDesk,
  GameDeskSegmentKeyType,
  VehicleOwnerType,
  CardsBattleOnDesk,
  ISaveGamingDesk,
  ISaveDataVechicle,
} from '../../types'
import { buildNewVehicle } from './buildNewVehicle'
import { CurrentGamer } from '../Game'
import { Headquarters } from '../HeadquartersDeck'
import { Tank } from '../TanksDeck'
import { Vehicle } from '../Vehicle'

export class Desk {
  public gamingDesk: IGamingDesk = {
    A1: null,
    A2: null,
    A3: null,
    A4: null,
    A5: null,

    B1: null,
    B2: null,
    B3: null,
    B4: null,
    B5: null,

    C1: null,
    C2: null,
    C3: null,
    C4: null,
    C5: null,
  }

  constructor(DeskData: IDesk | ISaveGamingDesk) {
    if (Object.hasOwn(DeskData, 'userHeadquarters')) {
      const { userHeadquarters, opponentHeadquarters } = DeskData as IDesk
      this.gamingDesk.A5 = buildNewVehicle({
        cell: 'A5',
        vehicleOwner: 'opponent',
        vehicle: opponentHeadquarters,
      })
      this.gamingDesk.C1 = buildNewVehicle({
        cell: 'C1',
        vehicleOwner: 'user',
        vehicle: userHeadquarters,
      })
    } else {
      const { gamingDesk } = DeskData as ISaveGamingDesk
      for (const cell in gamingDesk) {
        const vehicleData = gamingDesk[
          cell as GameDeskSegmentKeyType
        ] as unknown as ISaveDataVechicle
        if (vehicleData) {
          this.gamingDesk[cell as GameDeskSegmentKeyType] =
            buildNewVehicle(vehicleData)
        }
      }
    }
  }

  public getGamingDesk() {
    return this.gamingDesk
  }

  public isAccessibleGridForLanding(
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
      !this.isValidateMoveTarget(
        start,
        target,
        this.gamingDesk[start]?.getVehicleType()
      )
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

  private isValidateMoveTarget(
    start: GameDeskSegmentKeyType,
    target: GameDeskSegmentKeyType,
    typeTank?: string
  ) {
    if (
      start === 'A5' ||
      start === 'C1' ||
      this.gamingDesk[start] === null ||
      target === 'A5' ||
      target === 'C1' ||
      this.gamingDesk[target] !== null ||
      Math.abs(Number(start[1]) - Number(target[1])) > 1 ||
      (start[0] === 'A' && target[0] === 'C') ||
      (start[0] === 'C' && target[0] === 'A')
    ) {
      return false
    }

    if (
      typeTank !== 'средний' &&
      start[0] !== target[0] &&
      start[1] !== target[1]
    ) {
      return false
    }

    return true
  }

  public cardAttack(
    attacker: GameDeskSegmentKeyType,
    attackTarget: GameDeskSegmentKeyType
  ) {
    const attackerCard = this.gamingDesk[attacker]
    const attackTargetCard = this.gamingDesk[attackTarget]
    if (
      attackerCard &&
      attackTargetCard &&
      attackerCard.getVehicleOwner() !== attackTargetCard.getVehicleOwner() &&
      attackerCard.resolveAttack(attacker, attackTarget)
    ) {
      const tankAttackerType = attackerCard.getVehicleType()
      const tankTargetType = attackTargetCard.getVehicleType()
      const deletedTanks: (Vehicle | null)[] = []
      const attackCharacteristics = {
        attackerCard,
        attackTargetCard,
        deletedTanks,
      }
      if (tankAttackerType === 'ПТ-САУ' && tankTargetType === 'ПТ-САУ') {
        this.firstDamage({
          ...attackCharacteristics,
          isResolveCounterattack:
            attackCharacteristics.attackTargetCard.resolveCounterattack(),
        })
      } else if (tankAttackerType === 'ПТ-САУ') {
        this.firstDamage({
          ...attackCharacteristics,
          isResolveCounterattack: attackTargetCard.resolveCounterattack(),
          isAllowCounterattackDeadTank: false,
        })
      } else if (
        tankAttackerType === 'САУ' ||
        attackerCard.getVehicle() instanceof Headquarters
      ) {
        if (
          this.isThisTankVisible(
            attackTargetCard.skin.targetСell,
            attackTargetCard.getVehicleOwner()
          )
        ) {
          this.firstDamage({
            ...attackCharacteristics,
            isResolveCounterattack: false,
          })
        } else {
          attackerCard.returnAttackPoints()
        }
      } else if (
        tankTargetType === 'ПТ-САУ' &&
        attackTargetCard.resolveCounterattack()
      ) {
        this.firstDamage({
          attackerCard: attackTargetCard,
          attackTargetCard: attackerCard,
          isResolveCounterattack: true,
          isAllowCounterattackDeadTank: false,
          deletedTanks,
        })
      } else {
        this.firstDamage({
          ...attackCharacteristics,
          isResolveCounterattack:
            attackCharacteristics.attackTargetCard.resolveCounterattack(),
        })
      }

      return deletedTanks
    }
    return false
  }

  private isThisTankVisible(
    target: GameDeskSegmentKeyType,
    owner: VehicleOwnerType
  ) {
    if (target === 'A5' || target === 'C1') {
      return true
    }

    const isVisible = listPositions[target].find(segment => {
      const tank = this.gamingDesk[segment]
      if (tank) {
        return tank.getVehicleOwner() !== owner
      }
      return false
    })

    return !!isVisible
  }

  private firstDamage(CardsBattleOnDeskState: CardsBattleOnDesk) {
    const {
      attackerCard,
      attackTargetCard,
      deletedTanks,
      isAllowCounterattackDeadTank,
    } = CardsBattleOnDeskState
    const resultTakeDamage = attackTargetCard.takeDamage(
      attackerCard.currentDamage
    )
    if (!resultTakeDamage) {
      const deletedTank = this.deleteVehicleOnDesk(
        attackTargetCard.skin.targetСell
      )
      deletedTanks.push(deletedTank)
      if (isAllowCounterattackDeadTank === false) {
        return CardsBattleOnDeskState
      }
    }

    return this.counterattack(CardsBattleOnDeskState)
  }

  private counterattack(CardsBattleOnDeskState: CardsBattleOnDesk) {
    const {
      attackerCard,
      attackTargetCard,
      deletedTanks,
      isResolveCounterattack,
    } = CardsBattleOnDeskState
    if (!isResolveCounterattack) {
      return CardsBattleOnDeskState
    }
    const resultCounterattack = attackerCard.takeDamage(
      attackTargetCard.currentDamage
    )
    if (!resultCounterattack) {
      const deletedTank = this.deleteVehicleOnDesk(attackerCard.skin.targetСell)
      deletedTanks.push(deletedTank)
    }

    return CardsBattleOnDeskState
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

  public getHeadquartersHealth(target: GameDeskSegmentKeyType) {
    return this.gamingDesk[target]?.currentHealth
  }

  public gameSave() {
    return this.gamingDesk
  }
}
