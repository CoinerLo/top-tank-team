import { OrdersDataType } from '../types'

export const OrdersData: OrdersDataType[] = [
  {
    name: 'Бдительным',
    resourceСost: 2,
    nation: 'USSR',
    tier: 1,
    specialProperties: {
      all: ['Возьмите карту', 'Восстановите 2 прочности своему штабу.'],
    },
  },
  {
    name: 'Удар молота',
    resourceСost: 2,
    nation: 'USSR',
    tier: 1,
    specialProperties: {
      all: 'Нанесите 2 повреждения выбранному штабу, технике или взводу.',
    },
  },
  {
    name: 'Кто с мечом',
    resourceСost: 3,
    nation: 'USSR',
    tier: 3,
    specialProperties: {
      all: 'Выбранная техника не контратакует в этот ход.',
      USSR: 'Нанесите этой технике повреждения в количестве, равном её олневой мощи.',
    },
  },
  {
    name: 'Mit jeder Schlacht',
    resourceСost: 4,
    nation: 'German',
    tier: 1,
    specialProperties: {
      all: [
        'Нанесите 2 повреждения выбранной технике',
        'Восстановите 2 прочности своему штабу.',
      ],
    },
  },
  {
    name: 'Voraus',
    resourceСost: 2,
    nation: 'German',
    tier: 1,
    specialProperties: {
      all: 'Переместите свою выбранную технику на 1 клетку по горизонтали или вертикали.',
    },
  },
  {
    name: 'Wir kommen',
    resourceСost: 2,
    nation: 'German',
    tier: 2,
    specialProperties: {
      all: 'Игроки сбрасывают по 1 случайной карте из своей руки.',
      German: 'Нанесите 2 повреждения штабу противника.',
    },
  },
  {
    name: 'Crush',
    resourceСost: 9,
    nation: 'USA',
    tier: 1,
    specialProperties: {
      all: 'Нанесите 5 повреждений штабу противника.',
    },
  },
  {
    name: 'Together We Win',
    resourceСost: 5,
    nation: 'USA',
    tier: 2,
    specialProperties: {
      all: 'Выбранный штаб или техника могут атаковать еще раз в этот ход.',
      USA: 'Если выбранна техника - она получает способность "Прикрытие" до конца хода.',
    },
  },
  {
    name: 'Отстоим!',
    resourceСost: 1,
    nation: 'USSR',
    tier: 2,
    specialProperties: {
      all: 'Нанесите 2 повреждения выбранной технике.',
      USSR: 'Если выбрана САУ - она получает -1 к огневой мощи.',
    },
  },
  {
    name: 'Бей врага',
    resourceСost: 0,
    nation: 'USSR',
    tier: 1,
    specialProperties: {
      all: 'Нанесите 1 повреждение выбранному штабу или технике.',
    },
  },
  {
    name: 'Взять цель',
    resourceСost: 2,
    nation: 'USSR',
    tier: 3,
    specialProperties: {
      all: 'Выбранная техника не контратакует в этот ход.',
      USSR: 'Если выбран тяжелый танк - нанесите ему 6 повреждений.',
    },
  },
  {
    name: 'Vengeance',
    resourceСost: 7,
    nation: 'USA',
    tier: 3,
    specialProperties: {
      all: 'Нанесите по 2 повреждения всем САУ и лёгким танкам противника.',
      USA: 'Нанесите по 2 повреждения всем взводам противника.',
    },
  },
  {
    name: 'Heart of the Enemy',
    resourceСost: 2,
    nation: 'USA',
    tier: 1,
    specialProperties: {
      all: 'Нанесите 2 повреждения выбранному штабу, технике или взводу.',
    },
  },
  {
    name: 'Double Efforts',
    resourceСost: 5,
    nation: 'USA',
    tier: 2,
    specialProperties: {
      all: 'Выбранный штаб или техника могут атаковать еще раз в этот ход.',
      USA: 'Если выбранна техника - она получает способность "Прикрытие" до конца хода.',
    },
  },
]
