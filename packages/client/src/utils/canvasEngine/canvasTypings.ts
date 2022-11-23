import { CanvasEngine } from './canvasEngine'

export interface ISettings {
  alpha?: boolean
  imageSmoothling?: boolean
  fps?: number
  interval?: number
  DPI_WIDTH: number
  DPI_HEIGHT: number
}

interface IPosition {
  x: number
  y: number
  cell: string
}

interface IBaseCanvasElement {
  dx: number
  dy: number
}

interface ICardImgElement {
  w: number
  h: number
  src: string
}

interface IBaseText extends IBaseCanvasElement {
  text: string
  font: string
  fillStyle: string
}

export interface IElement {
  type: string
  position: IPosition
  cardImg: ICardImgElement
  baseImg: ICardImgElement & IBaseCanvasElement
  bringsResourcesIconImg: ICardImgElement & IBaseCanvasElement
  headIconImg: ICardImgElement & IBaseCanvasElement
  headText: IBaseText
  bringsResourcesText: IBaseText
  damage: IBaseText
  health: IBaseText
}

export interface IGrid {
  c: string
  lineWidth: number
}

export interface IDuring {
  gridPlugins: ((_: CanvasEngine, element: IGridElement) => void)[]
  elementsPlugins: ((_: CanvasEngine, element: IElement) => void)[]
}

export interface IGridElement {
  type: string
  position: Omit<IPosition, 'cell'>
  grid: IGrid
}
