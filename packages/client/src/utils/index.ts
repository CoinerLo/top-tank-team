import { Game } from '../gameCore/models/Game'
import { DataGameResultType } from '../typings'
import { rowsResultGameData } from './consts'

export const destinationSquare = (x: number, y: number) => {
  const ySegment = Math.floor(y / 171)
  const xSegment = Math.floor(x / 171)
  const xResult = xSegment + 1

  switch (ySegment) {
    case 0:
      return { y: 'A', x: xResult }
    case 1:
      return { y: 'B', x: xResult }
    default:
      return { y: 'C', x: xResult }
  }
}

export async function loadImage(url: string, elem: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    elem.src = url
    elem.onload = () => resolve(elem)
    elem.onerror = reject
  })
}

export const resultGameDataCreator = (game: Game): DataGameResultType => {
  const gameDesk = game.getDesk()

  const userState = game.getUserState()
  const userName = userState.getUserName()
  const userHeadquarters = userState.getHeadquarters().name
  const userHeadquartersHealth = gameDesk.getHeadquartersHealth('C1')
  const userCardsInDeck = userState.getCountCardsInDeck()
  const userResourcesSpent = userState.getCountResourcesSpent()
  const userVehiclesDestroyed = userState.getCountVehiclesDestroyed()
  const userPlatoonsDestroyed = userState.getCountPlatoonsDestroyed()
  const userOrdersPlayed = userState.getCountOrdersPlayed()

  const opponentState = game.getOpponentState()
  const opponentName = opponentState.getUserName()
  const opponentHeadquarters = opponentState.getHeadquarters().name
  const opponentHeadquartersHealth = gameDesk.getHeadquartersHealth('A5')
  const opponentCardsInDeck = opponentState.getCountCardsInDeck()
  const opponentResourcesSpent = opponentState.getCountResourcesSpent()
  const opponentVehiclesDestroyed = opponentState.getCountVehiclesDestroyed()
  const opponentPlatoonsDestroyed = opponentState.getCountPlatoonsDestroyed()
  const opponentStateOrdersPlayed = opponentState.getCountOrdersPlayed()

  return {
    disposition: {
      title: rowsResultGameData.disposition,
      user: userName,
      opponent: opponentName,
    },
    headquarters: {
      title: rowsResultGameData.headquarters,
      user: userHeadquarters,
      opponent: opponentHeadquarters,
    },
    deck_strength: {
      title: rowsResultGameData.deck_strength,
      user: 40,
      opponent: 40,
    },
    statistics: {
      title: rowsResultGameData.statistics,
      user: userName,
      opponent: opponentName,
    },
    headquarters_health: {
      title: rowsResultGameData.strength_headquarters,
      user: userHeadquartersHealth ?? 0,
      opponent: opponentHeadquartersHealth ?? 0,
    },
    cards_in_deck: {
      title: rowsResultGameData.cards_in_deck,
      user: userCardsInDeck,
      opponent: opponentCardsInDeck,
    },
    resources_spent: {
      title: rowsResultGameData.resources_spent,
      user: userResourcesSpent,
      opponent: opponentResourcesSpent,
    },
    vehicles_destroyed: {
      title: rowsResultGameData.vehicles_destroyed,
      user: userVehiclesDestroyed,
      opponent: opponentVehiclesDestroyed,
    },
    platoons_destroyed: {
      title: rowsResultGameData.platoons_destroyed,
      user: userPlatoonsDestroyed,
      opponent: opponentPlatoonsDestroyed,
    },
    orders_played: {
      title: rowsResultGameData.orders_played,
      user: userOrdersPlayed,
      opponent: opponentStateOrdersPlayed,
    },
  }
}
