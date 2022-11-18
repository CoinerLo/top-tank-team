export const BASE_URL = 'https://ya-praktikum.tech/api/v2/'

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
  Login = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание)',
  Password = 'Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра',
  EqualPassword = 'Пароли должны совпадать',
  Email = 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть @ и точка после нее, но перед точкой обязательно должны быть буквы',
  FirstName = 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  SecondName = 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  DisplayName = 'Должно содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание)',
  Phone = 'Телефон должен содержать от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
}

export enum RegExpValidation {
  Login = '^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$',
  Password = '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$',
  Email = '^[a-zA-Z0-9._%$#+-]+@[a-z0-9]*[a-z]+\\.+[a-z]+$',
  FirstName = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  SecondName = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  DisplayName = '^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$',
  Phone = '^[0-9+][0-9]{9,14}$',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
}

const fieldsIconPath = '/cards/images/fields/'

export const fieldsIcons = [
  `${fieldsIconPath}scouts-1-field.png`,
  `${fieldsIconPath}signalers-2-field.png`,
  `${fieldsIconPath}artillerymen-3-field.png`,
  `${fieldsIconPath}doctors-4-field.png`,
  `${fieldsIconPath}engineers-5-field.png`,
]

export enum BattleCardIcons {
  training = '/cards/icons/head-icon.png',
  tt = '/cards/icons/tt-icon.png',
  pt = '/cards/icons/pt-icon.png',
  lt = '/cards/icons/lt-icon.png',
  st = '/cards/icons/st-icon.png',
  say = '/cards/icons/say-icon.png',
}

const tankIconPath = '/cards/images/tanks/'

const headquartersIconPath = '/cards/images/headquarters/'

export const IconsByName: Record<string, string> = {
  Trainingslager: `${headquartersIconPath}german-image.png`,
  'Training Camp': `${headquartersIconPath}usa-image.png`,
  'Учебная часть': `${headquartersIconPath}ussr-image.png`,
  Liberty: `${tankIconPath}liberty-image.png`,
  T6: `${tankIconPath}t6-image.png`,
  'T-24': `${tankIconPath}t-24-image.png`,
  'T-35-1': `${tankIconPath}t-35-1-image.png`,
  'T-21': `${tankIconPath}t-21-image.png`,
  A7V: `${tankIconPath}a7v-image.png`,
  'СУ-18': `${tankIconPath}su-18-image.png`,
  'Panzerjager I': `${tankIconPath}panzerjagerI-image.png`,
  T18: `${tankIconPath}t-18-image.png`,
  Leichttraktor: `${tankIconPath}Leichttraktor-image.png`,
  'T1 LT': `${tankIconPath}t1-lt-image.png`,
  'T7 Combat Car': `${tankIconPath}t7-Combat-Car-image.png`,
  'МС-1': `${tankIconPath}ms-1-image.png`,
}

export enum HeadquartersNames {
  german = 'Trainingslager',
  usa = 'Training Camp',
  ussr = 'Учебная часть',
}

export const getHeadquartersPreview = (headquarters: string) => {
  switch (headquarters) {
    case HeadquartersNames.german:
      return 'avatar_default.png'
    case HeadquartersNames.ussr:
      return 'avatar_default_ussr.png'
    case HeadquartersNames.usa:
      return 'avatar_default_usa.png'
    default:
      return 'avatar_default.png'
  }
}
