import { drawCard } from './canvasEngine-drawCard'

export const canvasEnginePlugins = {
  after: [],
  before: [],
  during: [
    (_: any, element: any) => {
      if (element.afterRender || false) {
        element.afterRender(_, element)
      }
    },
    (_: any, element: any) => {
      if (element.beforeRender || false) {
        element.beforeRender(_, element)
      }
    },
    (_: any, element: any) => {
      if (element.grid) {
        const DPI_WIDTH = _.canvas.offsetWidth
        const DPI_HEIGHT = _.canvas.offsetHeight
        const step = DPI_HEIGHT / 3
        const stepX = DPI_WIDTH / 5
        _.context.strokeStyle = element.grid.c
        _.context.lineWidth = element.grid.lineWidth
        _.context.beginPath()
        for (let i = 1; i < 3; i++) {
          const y = step * i
          _.context.moveTo(0, y)
          _.context.lineTo(DPI_WIDTH, y)
        }
        for (let i = 1; i < 5; i++) {
          const x = stepX * i
          _.context.moveTo(x, 0)
          _.context.lineTo(x, DPI_HEIGHT)
        }
        _.context.stroke()
        _.context.closePath
      }
    },
    (_: any, element: any) => {
      if (element.img) {
        const pic = new Image()
        pic.src = element.img.src
        pic.onload = () => {
          _.context.drawImage(
            pic,
            element.position.x,
            element.position.y,
            element.position.dw || 170,
            element.position.dh || 170
          )
        }
      }
    },
    (_: any, element: any) => {
      if (element.text) {
        _.context.fillStyle = element.text.fillStyle
        _.context.font = element.text.font
        _.context.fillText(
          element.text.text,
          element.position.x,
          element.position.y
        )
      }
    },
    drawCard,
  ],
}
