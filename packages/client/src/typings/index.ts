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

export interface ISignInData {
  login: string
  password: string
}

export enum RequiredField {
  Default = 'Обязательно для заполнения!',
  Login = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
  Password = 'Пароль должен длиннее 6-ти символов',
}

export enum RegExpValidation {
  Login = '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$',
}
