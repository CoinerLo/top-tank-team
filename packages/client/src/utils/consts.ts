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
  ForumPost = ':postId',
  Error4 = 'error404',
  Game = 'game',
  StartGame = 'start',
  ResultGame = 'result',
  GameId = ':gameId',
}

export enum RequiredField {
  Default = 'Обязательно для заполнения!',
  Login = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
  Password = 'Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра',
  EqualPassword = 'Пароли должны совпадать',
  Email = 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть @ и точка после нее, но перед точкой обязательно должны быть буквы',
  FirstName = 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  SecondName = 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  DisplayName = 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  Phone = 'Телефон должен содержать от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
}

export enum RegExpValidation {
  Login = '^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$',
  Password = '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$',
  Email = '^[a-zA-Z0-9._%$#+-]+@[a-z0-9]*[a-z]+\\.+[a-z]+$',
  FirstName = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  SecondName = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  DisplayName = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  Phone = '^[0-9+][0-9]{9,14}$',
}

const path = '/cards/images/fields/'

export const fields = [
  `${path}scouts-1-field.png`,
  `${path}signalers-2-field.png`,
  `${path}artillerymen-3-field.png`,
  `${path}doctors-4-field.png`,
  `${path}engineers-5-field.png`,
]
