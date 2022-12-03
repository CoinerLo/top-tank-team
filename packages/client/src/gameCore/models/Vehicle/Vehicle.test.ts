import { Vehicle } from '.'
import { ElementsCreator } from '../../../utils/canvasEngine/canvasElement'
import { decksOfTanksByTier } from '../TanksDeck'

let newVehicle: Vehicle

const tank = decksOfTanksByTier.first[0]
const targetСell = 'A4'
const mockSkin = new ElementsCreator({
  type: 'card',
  tankBringsResources: tank.bringsResources,
  tankDamage: tank.damage,
  tankHealth: tank.health,
  tankName: tank.name,
  targetСell,
  tankType: tank.type,
})

beforeEach(
  () =>
    (newVehicle = new Vehicle({
      vehicleOwner: 'user',
      vehicle: tank,
      skin: mockSkin,
    }))
)

test('New vehicle create', () => {
  const tankName = newVehicle.getVehicle().name
  expect(tankName).toBe(tank.name)
})

test('Vehicle skin', () => {
  const target = newVehicle.skin.targetСell
  expect(target).toBe(targetСell)
})
