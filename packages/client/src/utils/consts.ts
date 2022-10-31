export enum AppRoute {
  Index = '/',
  SignIn = 'signin',
  SignUp = 'signup',
  Briefing = 'briefing',
  Headquarters = 'headquarters',
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

export enum RequiredField {
  Default = 'Обязательно для заполнения!',
  Login = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
  Password = 'Пароль должен длиннее 6-ти символов',
}

export enum RegExpValidation {
  Login = '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$',
}
