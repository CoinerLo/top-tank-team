import { canvasEnginePlugins } from './canvasEngine-plugins'

interface ISettings {
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
  isActive: boolean
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

interface IGrid {
  c: string
  lineWidth: number
}

interface IDuring {
  gridPlugins: ((_: CanvasEngine, element: IGridElement) => void)[]
  elementsPlugins: ((_: CanvasEngine, element: IElement) => void)[]
}

export interface IGridElement {
  type: string
  position: Omit<IPosition, 'cell' | 'isActive'>
  grid: IGrid
}

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

    // this.canvas.addEventListener('click', (event: MouseEvent) => {
    //   if(this.mouse.click === false){
    //     console.log('mouse false')
    //     this.elements.forEach((element: any) => {
    //       if(element.position.cell === cell) {
    //         if(element.position.isActive === false) {
    //           element.position.isActive = true
    //           this.mouse.click = true
    //           element.headText.fillStyle = 'red'
    //           console.log(element.position.cell, element.position.isActive)
    //         }
    //       }
    //     })
    //   } else {
    //     console.log('mouse true')
    //     let move = true
    //     this.elements.forEach((element: any) => {
    //       if(element.position.cell === cell) {
    //         if(element.position.isActive === true) {
    //           element.position.isActive = false
    //           element.headText.fillStyle = 'gray'
    //           this.mouse.click = false
    //           move = false
    //           console.log(element.position.cell, element.position.isActive)
    //           return
    //         } else {
    //           move = false
    //         }
    //       }
    //     })
    //     if (move === true) {
    //       console.log('перемещение')
    //       this.elements.forEach((element: any) => {
    //         if(element.position.isActive === true) {
    //           element.position.cell = cell
    //           element.position.isActive = false
    //           element.headText.fillStyle = 'gray'
    //           this.mouse.click = false
    //         }
    //       })
    //     }
    //   }
    // })
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

        if (activePositionElement && activePositionElement !== position && position === cell) {
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
      console.log('Click')
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

  // this.interval = setInterval(
  //   this => {
  //     this.render()
  //   },
  //   this.settings.interval,
  //   this
  // )
}
