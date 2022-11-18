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
  _.settings.fps = typeof settings.fps == 'number' ? settings.fps : 60
  _.settings.interval = Math.floor(1000 / _.settings.fps)

  _.canvas = document.querySelector(query)
  _.canvas.width = _.canvas.offsetWidth
  _.canvas.style.width = _.canvas.offsetWidth + 'px'
  _.canvas.height = _.canvas.offsetHeight
  _.canvas.style.height = _.canvas.offsetHeight + 'px'
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

  _.interval = setInterval(
    _ => {
      _.render()
    },
    _.settings.interval,
    _
  )
  return _
}
