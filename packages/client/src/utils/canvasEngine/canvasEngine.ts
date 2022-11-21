import { destinationSquare } from '../'
import { canvasEnginePlugins } from './canvasEngine-plugins'

interface ISettings {
  alpha: boolean
  imageSmoothling: boolean
  fps: number
  interval: number
}

interface IPosition {
  x: number
  y: number
  cell: string
  isActive: boolean
}

interface IElement {
  type: string
  position: IPosition
  cardImg: Record<string, string | number>
  baseImg: Record<string, string | number>
  bringsResourcesIconImg: Record<string, string | number>
  headIconImg: Record<string, string | number>
  headText: Record<string, string | number>
  bringsResourcesText: Record<string, string | number>
  damage: Record<string, string | number>
  health: Record<string, string | number>
}

interface IGridElement {
  position: Omit<IPosition, 'cell' | 'isActive'>
}

// function click(event: MouseEvent) {
//   const { x, y } = destinationSquare(event.offsetX, event.offsetY)
//   const cell = `${y}${x}`
//   console.log('Вот так всего один click in', cell)
// }

export class CanvasEngine {
  query: string | null
  settings: any
  canvas: any
  plugins: {
    after: never[]
    before: never[]
    during: ((_: any, element: any) => void)[]
  }
  elements: IElement[] | IGridElement[] = []
  context: any
  mouse: { click: boolean; cell: string | null }
  activeElement: null | IElement = null

  constructor(query: string | null, settings = {} as any) {
    console.log('мы два раза создаем игру - и это проблема')
    this.query = query
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
    this.canvas.style.width = settings.DPIthisWIDTH + 'px'
    this.canvas.height = settings.DPI_HEIGHT
    this.canvas.style.height = settings.DPIthisHEIGHT + 'px'
    this.plugins = canvasEnginePlugins
    this.context = this.canvas.getContext('2d', { alpha: this.settings.alpha })
    this.context.imageSmoothingEnabled = this.settings.imageSmoothling
    this.context.mozImageSmoothingEnabled = this.settings.imageSmoothling
    this.context.webkitImageSmoothingEnabled = this.settings.imageSmoothling
    this.mouse = {
      cell: null,
      click: false,
    }

    // this.canvas.addEventListener('click', click)

    // this.canvas.addEventListener('click', (event: MouseEvent) => {
    //   console.log(this)

    //   this.click(cell)
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
      this.elements.forEach((element: any) => {
        if(element.position.cell === cell) {
          this.activeElement = element
          this.mouse.click = !this.mouse.click
          this.mouse.cell = cell
          element.headText.fillStyle = 'red'
          this.render()
        }
      })
    } else {
      this.mouse.click = !this.mouse.click

      this.elements.forEach((element: any) => {
        const position = element.position.cell

        if (position === this.mouse.cell) {
          console.log('bingo')
        }
      })
      if (this.activeElement) {
        this.activeElement.headText.fillStyle = 'gray'
        this.activeElement = null
      }
      this.mouse.cell = null
      this.render()
      console.log('Click')
    }
  }

  render() {
    // this.plugins.before.forEach((plugin: any) => { // пока убрал т.к. не используем
    //   plugin(this)
    // })

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.elements.forEach((element: any) => {
      this.plugins.during.forEach((plugin: any) => {
        plugin(this, element)
      })
    })

    // this.plugins.after.forEach((plugin: any) => { // пока убрал т.к. не используем
    //   plugin(this)
    // })
  }

  // removeListener() {
  //   console.log()
  //   this.canvas.removeEventListener('click', click)
  // }

  // this.interval = setInterval(
  //   this => {
  //     this.render()
  //   },
  //   this.settings.interval,
  //   this
  // )
}
