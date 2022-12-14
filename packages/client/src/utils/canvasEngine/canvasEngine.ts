import { GameDeskSegmentKeyType, IGamingDesk } from '../../gameCore/types'
import { canvasEnginePlugins } from './canvasEngine-plugins'
import { IDuring, IGridElement, ISettings } from './canvasTypings'

export class CanvasEngine {
  settings: ISettings
  canvas: HTMLCanvasElement
  elements: IGamingDesk = {} as IGamingDesk
  grid: IGridElement[] = []
  context: CanvasRenderingContext2D | undefined
  plugins: { during: IDuring }

  constructor(query: HTMLCanvasElement, settings: ISettings) {
    this.settings = settings
    this.settings.alpha =
      typeof settings.alpha === 'boolean' ? settings.alpha : true
    this.settings.imageSmoothling = settings.imageSmoothling ?? false
    this.settings.fps = settings.fps ?? 0
    this.settings.interval = Math.floor(1000 / this.settings.fps)
    this.canvas = query
    this.canvas.width = settings.DPI_WIDTH
    this.canvas.style.width = settings.DPI_WIDTH + 'px'
    this.canvas.height = settings.DPI_HEIGHT
    this.canvas.style.height = settings.DPI_HEIGHT + 'px'
    this.plugins = canvasEnginePlugins
    const context = this.canvas.getContext('2d', { alpha: this.settings.alpha })

    if (context) {
      this.context = context
      this.context.imageSmoothingEnabled = this.settings.imageSmoothling
    }
  }

  click(isRender: boolean) {
    if (isRender) {
      this.render()
    }
  }

  setElements(elements: IGamingDesk) {
    this.elements = elements
  }

  setGrid(grid: IGridElement[]) {
    this.grid = grid
  }

  render() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    this.grid.forEach((element: IGridElement) => {
      this.plugins.during.gridPlugins.forEach(plugin => {
        plugin(this, element)
      })
    })

    for (const elementKey in this.elements) {
      const element = this.elements[elementKey as GameDeskSegmentKeyType]
      if (element !== null) {
        this.plugins.during.elementsPlugins.forEach(plugin => {
          plugin(this, element.skin.getElement())
        })
      }
    }
  }
}
