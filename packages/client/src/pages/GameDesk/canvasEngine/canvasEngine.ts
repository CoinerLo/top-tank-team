interface _settings {
  alpha: boolean
  imageSmoothling: boolean
  fps: number
  interval: number
}
interface _canvasEngine {
  query: any
  settings: _settings
  canvas: any
  context: any
  interval: any
  render: any
  elements: any
  plugins: any
  mouse: any
}

const loadImage = (src: any) => {
  return new Promise(resolve => {
    const image = new Image()
    image.src = src
    image.onload = () => resolve(image)
  })
}

export let canvasEnginePlugins = {
  after: [],
  before: [],
  during: [
    (_: any, element: any) => {
      if (element.drawRect) {
        _.context.fillStyle = element.drawRect.c
        _.context.beginPath()
        _.context.rect(
          element.position.x + (element.drawRect.x || 0),
          element.position.y + (element.drawRect.y || 0),
          element.drawRect.w,
          element.drawRect.h
        )
        _.context.fill()
      }
    },
    (_: any, element: any) => {
      if (element.drawRound) {
        _.context.fillStyle = element.drawRound.c
        _.context.beginPath()
        _.context.roundRect(
          element.position.x + (element.drawRound.x || 0),
          element.position.y + (element.drawRound.y || 0),
          element.drawRound.w,
          element.drawRound.h,
          element.drawRound.r
        )
        _.context.fill()
      }
    },
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
      if (element.setka) {
        const DPI_WIDTH = _.canvas.offsetWidth
        const DPI_HEIGHT = _.canvas.offsetHeight
        const step = DPI_HEIGHT / 3
        _.context.strokeStyle = element.setka.c
        _.context.lineWidth = element.setka.lineWidth
        _.context.beginPath()
        for (let i = 1; i < 3; i++) {
          const y = step * i
          _.context.moveTo(0, y)
          _.context.lineTo(DPI_WIDTH, y)
        }
        _.context.stroke()
        _.context.closePath
      }
    },
    (_: any, element: any) => {
      if (element.setka) {
        const DPI_WIDTH = _.canvas.offsetWidth
        const DPI_HEIGHT = _.canvas.offsetHeight
        const stepX = DPI_WIDTH / 5
        _.context.strokeStyle = element.setka.c
        _.context.lineWidth = element.setka.lineWidth
        _.context.beginPath()
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
        let pic = new Image()
        pic.src = element.img.src
        pic.onload = () => {
          _.context.drawImage(pic, element.position.x, element.position.y, element.position.dw || 170, element.position.dh || 170)
        }
      }
    },
    (_: any, element: any) => {
      if (element.text) {
        _.context.fillStyle = element.text.fillStyle
        _.context.font = element.text.font
        _.context.fillText(element.text.text, element.position.x, element.position.y)
      }
    },
    (_: any, element: any) => {
      if(element.type == 'card') {
        let cardImg = new Image()
        cardImg.src = element.cardImg.src
        cardImg.onload = () => {
          _.context.drawImage(cardImg, element.position.x, element.position.y, element.cardImg.w, element.cardImg.h)
          let baseImg = new Image()
          baseImg.src = element.baseImg.src
          baseImg.onload = () => {
            _.context.drawImage(baseImg, element.position.x + element.baseImg.dx, element.position.y + element.baseImg.dy, element.baseImg.w, element.baseImg.h)
            let bringsResourcesIconImg = new Image()
            bringsResourcesIconImg.src = element.bringsResourcesIconImg.src
            bringsResourcesIconImg.onload = () => {
              _.context.drawImage(bringsResourcesIconImg, element.position.x + element.bringsResourcesIconImg.dx, element.position.y + element.bringsResourcesIconImg.dy, element.bringsResourcesIconImg.w, element.bringsResourcesIconImg.h)
              let headIconImg = new Image()
              headIconImg.src = element.headIconImg.src
              headIconImg.onload = () => {
                _.context.drawImage(headIconImg, element.position.x + element.headIconImg.dx, element.position.y + element.headIconImg.dy, element.headIconImg.w, element.headIconImg.h)
                _.context.fillStyle = element.headText.fillStyle
                _.context.font = element.headText.font
                _.context.fillText(element.headText.text, element.position.x + element.headText.dx, element.position.y + element.headText.dy)
                _.context.fillStyle = element.bringsResourcesText.fillStyle
                _.context.font = element.bringsResourcesText.font
                _.context.fillText(element.bringsResourcesText.text, element.position.x + element.bringsResourcesText.dx, element.position.y + element.bringsResourcesText.dy)
              }
            }
          }
        }
      }
    }
    // async () => {
    //   imageL = (await loadImage('./../cards/battleCard.png')) as CanvasImageSource
    //   if (ctx) {
    //     if (imageL) {
    //       ctx?.drawImage(imageL, 0, DPI_HEIGHT - 200, 200, 200)
    //     }
    //     const image2 = (await loadImage(
    //       './../cards/images/headquarters/ussr-image.png'
    //     )) as CanvasImageSource
    //     ctx.drawImage(image2, 0 + 16, DPI_HEIGHT - 200 + 40, 170, 152)
    //     const image3 = (await loadImage(
    //       './../cards/bringsResources.png'
    //     )) as CanvasImageSource
    //     ctx.drawImage(image3, 0 + 150, DPI_HEIGHT - 200, 50, 50)
    //     const image4 = (await loadImage(
    //       './../cards/icons/head-icon.png'
    //     )) as CanvasImageSource
    //     ctx.drawImage(image4, 0 + 3, DPI_HEIGHT - 190, 25, 25)
    //     ctx.fillStyle = 'gray'
    //     ctx.font = '12pt Arial'
    //     ctx.fillText('Учебная часть', 0 + 30, DPI_HEIGHT - 170)
    //     ctx.fillStyle = '#000'
    //     ctx.font = 'bold 16pt Arial'
    //     ctx.fillText('5', 0 + 172, DPI_HEIGHT - 165)
    //   }
    // }
  ],
}

export function canvasEngine(query: any, settings = {} as any): any {
  let _ = {} as _canvasEngine
  _.query = query
  _.settings = settings
  _.settings.alpha = typeof settings.alpha == 'boolean' ? settings.alpha : true
  _.settings.imageSmoothling =
    typeof settings.imageSmoothling == 'boolean'
      ? settings.imageSmoothling
      : false
  _.settings.fps = typeof settings.fps == 'number' ? settings.fps : 0
  _.settings.interval = Math.floor(1000 / _.settings.fps)

  _.canvas = document.querySelector(query)
  _.canvas.width = settings.DPI_WIDTH
  _.canvas.style.width = settings.DPI_WIDTH + 'px'
  _.canvas.height = settings.DPI_HEIGHT
  _.canvas.style.height = settings.DPI_HEIGHT + 'px'
  // _.canvas.width = _.canvas.offsetWidth
  // _.canvas.style.width = _.canvas.offsetWidth + 'px'
  // _.canvas.height = _.canvas.offsetHeight
  // _.canvas.style.height = _.canvas.offsetHeight + 'px'
  _.canvas.addEventListener('click', () => {
    _.mouse.click = true
  })
  _.canvas.addEventListener('mousemove', (event: any) => {
    _.mouse.position.x = event.offsetX
    _.mouse.position.y = event.offsetY
  })
  _.mouse = {
    position: { x: 0, y: 0 },
    click: false,
  }

  _.context = _.canvas.getContext('2d', { alpha: _.settings.alpha })
  _.context.imageSmoothingEnabled = _.settings.imageSmoothling
  _.context.mozImageSmoothingEnabled = _.settings.imageSmoothling
  _.context.webkitImageSmoothingEnabled = _.settings.imageSmoothling

  _.elements = []
  _.plugins = canvasEnginePlugins
  _.render = function () {
    this.plugins.before.forEach((plugin: any) => {
      plugin(this)
    })
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.elements.forEach((element: any) => {
      if (
        element.mouse &&
        this.mouse.position.x >= element.mouse.x &&
        this.mouse.position.x <= element.mouse.x + element.mouse.w &&
        this.mouse.position.y >= element.mouse.y &&
        this.mouse.position.y <= element.mouse.y + element.mouse.h
      ) {
        if (!element.mouse.hover) {
          if (element.mouseover) {
            element.mouseover()
          }
          element.mouse.hover = true
        }
        if (this.mouse.click && element.click) {
          element.click()
          this.mouse.false
        }
      } else if (element.mouse && element.mouse.hover) {
        if (element.mouseoff) {
          element.mouseoff()
        }
        element.mouse.hover = false
      }

      this.plugins.during.forEach((plugin: any) => {
        plugin(this, element)
      })
    })
    this.mouse.click = false
    this.plugins.after.forEach((plugin: any) => {
      plugin(this)
    })
  }

  // _.interval = setInterval(
  //   _ => {
  //     _.render()
  //   },
  //   _.settings.interval,
  //   _
  // )
  return _
}


