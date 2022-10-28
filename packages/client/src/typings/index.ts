export enum AppRoute {
  Index = '/',
  SignIn = 'signin',
  SignUp = 'signup',
  Briefing = 'briefing',
  Home = 'home',
  Upgrade = 'upgrade',
  Deck = 'deck',
  Leaderboard = 'leaderboard',
  Forum = 'forum',
  Error4 = 'error404',
  Game = 'game',
  StartGame = 'start',
  ResultGame = 'result',
  GameId = ':gameId',
}

export interface UserI {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string | null
}
