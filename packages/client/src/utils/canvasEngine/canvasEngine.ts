import { canvasEnginePlugins } from './canvasEngine-plugins'
import { IDuring, IElement, IGridElement, ISettings } from './canvasTypings'

export class CanvasEngine {
  settings: ISettings
  canvas: HTMLCanvasElement
  elements: IElement[] = []
  grid: IGridElement[] = []
  mouse: { click: boolean; cell: string | null }
  activeElement: null | IElement = null
  context: CanvasRenderingContext2D | undefined
  plugins: { after: never[]; before: never[]; during: IDuring }

  constructor(query: HTMLCanvasElement, settings: ISettings) {
    this.settings = settings
    this.settings.alpha =
      typeof settings.alpha == 'boolean' ? settings.alpha : true
    this.settings.imageSmoothling =
      typeof settings.imageSmoothling == 'boolean'
        ? settings.imageSmoothling
        : false
    this.settings.fps = typeof settings.fps == 'number' ? settings.fps : 0
    this.settings.interval = Math.floor(1000 / this.settings.fps)
    this.canvas = query
    this.canvas.width = settings.DPI_WIDTH
    this.canvas.style.width = settings.DPI_WIDTH + 'px'
    this.canvas.height = settings.DPI_HEIGHT
    this.canvas.style.height = settings.DPI_HEIGHT + 'px'
    this.plugins = canvasEnginePlugins
    const context = this.canvas.getContext('2d', { alpha: this.settings.alpha })
    this.mouse = {
      cell: null,
      click: false,
    }

    if (context) {
      this.context = context
      this.context.imageSmoothingEnabled = this.settings.imageSmoothling
    }
  }

  click(cell: string) {
    if (!this.mouse.click) {
      this.elements.forEach((element: IElement) => {
        if (element.position.cell === cell) {
          this.activeElement = element
          this.mouse.click = !this.mouse.click
          this.mouse.cell = cell
          element.headText.fillStyle = 'red'
          this.render()
        }
      })
    } else {
      this.mouse.click = false
      let isMove = true
      const activePositionElement = this.activeElement?.position.cell

      this.elements.forEach((element: IElement) => {
        const position = element.position.cell

        if (
          activePositionElement &&
          activePositionElement !== position &&
          position === cell
        ) {
          isMove = false
          console.log('здесь будет взаимодействие карточек')
        }
      })

      if (activePositionElement === cell) {
        isMove = false
      }

      if (isMove && this.activeElement) {
        this.activeElement.position.cell = cell
      }

      if (this.activeElement) {
        this.activeElement.headText.fillStyle = 'gray'
        this.activeElement = null
      }

      this.mouse.cell = null
      this.render()
    }
  }

  setElements(elements: IElement[]) {
    this.elements = elements
  }

  setGrid(grid: IGridElement[]) {
    this.grid = grid
  }

  render() {
    // this.plugins.before.forEach((plugin: any) => { // пока убрал т.к. не используем
    //   plugin(this)
    // })
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    this.grid.forEach((element: IGridElement) => {
      this.plugins.during.gridPlugins.forEach(plugin => {
        plugin(this, element)
      })
    })

    this.elements.forEach((element: IElement) => {
      this.plugins.during.elementsPlugins.forEach(plugin => {
        plugin(this, element)
      })
    })

    // this.plugins.after.forEach((plugin: any) => { // пока убрал т.к. не используем
    //   plugin(this)
    // })
  }

  // this.interval = setInterval( // Метод постоянных перерисовок для анимации пока плохо работает с большим кол-вом картинок, возможно решим это в будущих версиях
  //   this => {
  //     this.render()
  //   },
  //   this.settings.interval,
  //   this
  // )
}
