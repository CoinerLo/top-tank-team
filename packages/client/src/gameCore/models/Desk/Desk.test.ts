import { Desk } from '.'
import { fullHeadquartersDeck } from '../HeadquartersDeck'

const opponentHeadquarters = fullHeadquartersDeck[0]
const userHeadquarters = fullHeadquartersDeck[1]

let desk: Desk

beforeEach(() => (desk = new Desk({ opponentHeadquarters, userHeadquarters })))

test('Desk start configuration', () => {
  const gamingDesk = desk.getGamingDesk()
  const userHeadquartersName = gamingDesk.c1.name
  expect(userHeadquartersName).toBe(userHeadquarters.name)
})
