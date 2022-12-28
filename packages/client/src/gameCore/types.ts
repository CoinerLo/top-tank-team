import { ElementsCreator } from '../utils/canvasEngine/canvasElement'
import { CurrentGamer } from './models/Game'
import { Headquarters } from './models/HeadquartersDeck'
import { Order } from './models/OrdersDeck'
import { Platoon } from './models/PlatoonsDeck'
import { Tank } from './models/TanksDeck'
import { Vehicle } from './models/Vehicle'

export type TankType = 'тяжёлый' | 'средний' | 'лёгкий' | 'ПТ-САУ' | 'САУ'
export type PlatoonsType =
  | 'Артиллеристы'
  | 'Инженеры'
  | 'Медики'
  | 'Разведчики'
  | 'Связисты'

export type NationType = 'German' | 'USA' | 'USSR'
export type CardTier = 1 | 2 | 3
export type HeadquartersType = 'учебный' | 'ударный' | 'сводный' | 'тыловой'

export interface ISpecialProperties {
  German?: string | string[]
  USA?: string | string[]
  USSR?: string | string[]
  all?: string | string[]
}

export type BaseCardType = Omit<
  ITank,
  'bringsResources' | 'type' | 'damage' | 'health' | 'specialProperties'
>

export interface ITank {
  id?: string
  name: string
  resourceСost: number // Кол-во ресурсов необходимых для вывовда карты на поле
  bringsResources: number // Кол-во ресурсов которые приносит карта пока находится на поле
  tier: CardTier // Уровень карты
  type: TankType
  nation: NationType
  damage: number // Сколько наносит очков урона
  health: number // Запас здоровья
  specialProperties?: ISpecialProperties // Специальные возможности карты
}

export type TanksDataType = Omit<ITank, 'id'>

export interface IPlatoon {
  id: number
  name: string
  resourceСost: number
  bringsResources: number
  tier: CardTier
  type: PlatoonsType
  nation: NationType
  damage?: number
  defense?: number
  health: number
  specialProperties?: ISpecialProperties
}

export type PlatoonsDataType = Omit<IPlatoon, 'id'>

export interface IOrder {
  id: number
  name: string
  resourceСost: number
  tier: CardTier
  nation: NationType
  specialProperties: ISpecialProperties
}

export type OrdersDataType = Omit<IOrder, 'id'>

export interface IHeadquarters {
  id: number
  name: string
  bringsResources: number
  tier: CardTier
  type: HeadquartersType
  nation: NationType
  damage: number
  health: number
  specialProperties?: ISpecialProperties
  icon: string
}

export type HeadquartersDataType = Omit<IHeadquarters, 'id' | 'icon'>

export type CardsDeckType = Tank | Order | Platoon

export interface IUserData {
  userName: string
  headquartersName: string
  deck: CardsDeckType[]
}

export interface IDesk {
  userHeadquarters: Headquarters
  opponentHeadquarters: Headquarters
}

export type GameDeskSegmentKeyType =
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5'
  | 'B1'
  | 'B2'
  | 'B3'
  | 'B4'
  | 'B5'
  | 'C1'
  | 'C2'
  | 'C3'
  | 'C4'
  | 'C5'

export type IGamingDesk = {
  [key in GameDeskSegmentKeyType]: Vehicle | null
}

export type ISaveGamingDesk = {
  gamingDesk: IGamingDesk
}

export type VehicleOwnerType = 'user' | 'opponent'
export interface IVehicle {
  vehicle: Tank | Headquarters
  vehicleOwner: VehicleOwnerType
  skin: ElementsCreator
}

export interface CardsBattleOnDesk {
  attackerCard: Vehicle
  attackTargetCard: Vehicle
  deletedTanks: (Vehicle | null)[]
  isResolveCounterattack: boolean
  isAllowCounterattackDeadTank?: boolean
}

export interface IGameUserStateSave {
  name: string
  headquarters: Headquarters
  deck: CardsDeckType[]
  hand: CardsDeckType[]
  throw: CardsDeckType[]
  currentCountResources: number
  futureСountResources: number
  resourcesSpent: number
  vehiclesDestroyed: number
  platoonsDestroyed: number
  ordersPlayed: number
}

export interface IGameSave {
  id: string
  currentGamer: CurrentGamer
  UserState: IGameUserStateSave
  OpponentState: IGameUserStateSave
  Desk: ISaveGamingDesk
}

export interface IBuildNewVehicle {
  cell: GameDeskSegmentKeyType
  vehicleOwner: VehicleOwnerType
  vehicle: Headquarters | Tank
}

export interface ISaveDataVechicle {
  currentAttackPoints: number
  currentCounterattackPoints: number
  currentDamage: number
  currentHealth: number
  currentMoves: number
  maxAttackPoints: number
  maxCounterattackPoints: number
  maxHealth: number
  maxMoves: number
  skin: ElementsCreator
  vehicle: Tank | Headquarters
  vehicleOwner: VehicleOwnerType
}
