export const BASE_URL = 'https://ya-praktikum.tech/api/v2/'
export const SERVER_URL = `http://localhost:${__SERVER_PORT__}/`

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

export enum ChangePasswordStatus {
  Changed = 'Пароль успешно изменен!',
  NoChanged = 'Ошибка, пароль не изменен!',
}

export enum NameSpace {
  User = 'USER',
  Decks = 'DECKS',
  Game = 'GAME',
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
  учебный = '/cards/icons/head-icon.png',
  тяжёлый = '/cards/icons/tt-icon.png',
  'ПТ-САУ' = '/cards/icons/pt-icon.png',
  лёгкий = '/cards/icons/lt-icon.png',
  средний = '/cards/icons/st-icon.png',
  САУ = '/cards/icons/say-icon.png',
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

const tankImagePath = '/cards/tanks/'

export const ImageByName: Record<string, string> = {
  Liberty: `${tankImagePath}liberty.png`,
  T6: `${tankImagePath}t6.png`,
  'T-24': `${tankImagePath}t-24.png`,
  'T-35-1': `${tankImagePath}t-35-1.png`,
  'T-21': `${tankImagePath}t-21.png`,
  A7V: `${tankImagePath}a7v.png`,
  'СУ-18': `${tankImagePath}su-18.png`,
  'Panzerjager I': `${tankImagePath}panzerjagerI.png`,
  T18: `${tankImagePath}t-18.png`,
  Leichttraktor: `${tankImagePath}leichttraktor.png`,
  'T1 LT': `${tankImagePath}t1-lt.png`,
  'T7 Combat Car': `${tankImagePath}t7-Combat-Car.png`,
  'МС-1': `${tankImagePath}ms1.png`,
}

export enum HeadquartersNames {
  german = 'Trainingslager',
  usa = 'Training Camp',
  ussr = 'Учебная часть',
}

export const getHeadquartersPreview = (headquarters: string) => {
  switch (headquarters) {
    case HeadquartersNames.german:
      return '/game/avatar_default.png'
    case HeadquartersNames.ussr:
      return '/game/avatar_default_ussr.png'
    case HeadquartersNames.usa:
      return '/game/avatar_default_usa.png'
    default:
      return '/game/avatar_default.png'
  }
}

export const coordinates = {
  A1: { x: 0, y: 0 },
  A2: { x: 171, y: 0 },
  A3: { x: 342, y: 0 },
  A4: { x: 513, y: 0 },
  A5: { x: 684, y: 0 },
  B1: { x: 0, y: 171 },
  B2: { x: 171, y: 171 },
  B3: { x: 342, y: 171 },
  B4: { x: 513, y: 171 },
  B5: { x: 684, y: 171 },
  C1: { x: 0, y: 342 },
  C2: { x: 171, y: 342 },
  C3: { x: 342, y: 342 },
  C4: { x: 513, y: 342 },
  C5: { x: 684, y: 342 },
}

export const DPI_WIDTH = 854
export const DPI_HEIGHT = 512

export const rowsResultGameData = {
  disposition: 'Диспозиция',
  headquarters: 'Штаб',
  deckStrength: 'Сила колоды',
  statistics: 'Статистика',
  strength_headquarters: 'Прочность штаба в момент окончания боя',
  cardsInDeck: 'Карт в колоде в момент окончания боя',
  resourcesSpent: 'Потрачено ресурсов за бой',
  vehiclesDestroyed: 'Уничтожено техники противника',
  platoonsDestroyed: 'Уничтожено взводов противника',
  ordersPlayed: 'Разыграно приказов',
}
