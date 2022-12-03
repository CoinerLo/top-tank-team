import { ElementsCreator } from '../../../utils/canvasEngine/canvasElement'
import { IBuildNewVehicle, ISaveDataVechicle } from '../../types'
import { findCardFromDeckById } from '../../utils'
import { headquartersByName } from '../HeadquartersDeck'
import { Vehicle } from '../Vehicle'

export const buildNewVehicle = (
  vehicleData: IBuildNewVehicle | ISaveDataVechicle
) => {
  if (Object.hasOwn(vehicleData, 'cell')) {
    const { cell, vehicleOwner, vehicle } = vehicleData as IBuildNewVehicle
    const skin = new ElementsCreator({
      type: 'card',
      targetСell: cell,
      tankBringsResources: vehicle.bringsResources,
      tankDamage: vehicle.damage,
      tankHealth: vehicle.health,
      tankName: vehicle.name,
      tankType: vehicle.type,
    })

    return new Vehicle({ vehicle, skin, vehicleOwner })
  } else {
    const {
      currentAttackPoints,
      currentCounterattackPoints,
      currentHealth,
      currentMoves,
      skin,
      vehicle,
      vehicleOwner,
    } = vehicleData as ISaveDataVechicle
    const newSkin = new ElementsCreator({
      type: 'card',
      targetСell: skin.targetСell,
      tankBringsResources: vehicle.bringsResources,
      tankDamage: vehicle.damage,
      tankHealth: currentHealth,
      tankName: vehicle.name,
      tankType: vehicle.type,
    })
    const cardId = vehicle.id
    let card = findCardFromDeckById(cardId)
    if (!card) {
      card = headquartersByName[vehicle.name]
    }
    const newVehicle = new Vehicle({
      vehicle: card,
      skin: newSkin,
      vehicleOwner,
    })

    return newVehicle
      .setCurrentMoves(currentMoves)
      .setCurrentAttackPoints(currentAttackPoints)
      .setCurrentCounterattackPoints(currentCounterattackPoints)
      .setCurrentHealth(currentHealth)
  }
}
