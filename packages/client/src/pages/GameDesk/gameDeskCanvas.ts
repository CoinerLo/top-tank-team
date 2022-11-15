import { fullHeadquartersDeck } from '../../gameCore/models/HeadquartersDeck'

// export function icanvas(canvas: HTMLCanvasElement) {
//   const ctx = canvas?.getContext('2d')
//   canvas.width = 856
//   canvas.height = 514

// }

// let canvas = document.getElementById('icanvas') as HTMLCanvasElement
// let ctx = canvas?.getContext("2d")

const WIDTH = 1000
const HEIGHT = 600
const DPI_WIDTH = 1000
const DPI_HEIGHT = 600

const setka = {
  gorigont: [
    [
      [0, 1],
      [1000, 1],
    ],
    [
      [0, 200],
      [1000, 200],
    ],
  ],
  vertikal: [],
}

export const icanvas = (
  canvas: HTMLCanvasElement,
  canvasT: HTMLCanvasElement
) => {
  const ctx = canvas?.getContext('2d')
  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGHT + 'px'
  canvas.width = DPI_WIDTH
  canvas.height = DPI_HEIGHT

  const ctx2 = canvasT?.getContext('2d')

  // y axis
  const step = DPI_HEIGHT / 3

  if (ctx) {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'
    for (let i = 1; i < 3; i++) {
      const y = step * i
      ctx.moveTo(0, y)
      ctx.lineTo(DPI_WIDTH, y)
    }
    ctx.stroke()
    ctx.closePath
  }

  // x axis
  const stepX = DPI_WIDTH / 5

  if (ctx) {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'
    for (let i = 1; i < 5; i++) {
      const x = stepX * i
      ctx.moveTo(x, 0)
      ctx.lineTo(x, DPI_HEIGHT)
    }
    ctx.stroke()
    ctx.closePath
  }

  let imageL: any

  // if (ctx) {
  //   ctx.beginPath()
  //   ctx.lineWidth = 2
  //   ctx.strokeStyle = 'white'
  //   for (const line of setka.gorigont) {
  //     for (const [x, y] of line) {
  //       ctx?.lineTo(x, DPI_HEIGHT - y)
  //     }
  //     ctx.stroke()
  //   }
  //   ctx.closePath()
  // }

  const main2 = async () => {
    const imageT = (await loadImage(
      './../cards/images/headquarters/ussr-image.png'
    )) as CanvasImageSource
    ctx2?.drawImage(imageT, 0, 0, 100, 100)
  }
  main2()

  const main = async () => {
    imageL = (await loadImage('./../cards/battleCard.png')) as CanvasImageSource
    if (ctx) {
      if (imageL) {
        ctx?.drawImage(imageL, 0, DPI_HEIGHT - 200, 200, 200)
      }
      const image2 = (await loadImage(
        './../cards/images/headquarters/ussr-image.png'
      )) as CanvasImageSource
      ctx.drawImage(image2, 0 + 16, DPI_HEIGHT - 200 + 40, 170, 152)
      const image3 = (await loadImage(
        './../cards/bringsResources.png'
      )) as CanvasImageSource
      ctx.drawImage(image3, 0 + 150, DPI_HEIGHT - 200, 50, 50)
      const image4 = (await loadImage(
        './../cards/icons/head-icon.png'
      )) as CanvasImageSource
      ctx.drawImage(image4, 0 + 3, DPI_HEIGHT - 190, 25, 25)
      ctx.fillStyle = 'gray'
      ctx.font = '12pt Arial'
      ctx.fillText('Учебная часть', 0 + 30, DPI_HEIGHT - 170)
      ctx.fillStyle = '#000'
      ctx.font = 'bold 16pt Arial'
      ctx.fillText('5', 0 + 172, DPI_HEIGHT - 165)
    }
  }

  const loadImage = (src: any) => {
    return new Promise(resolve => {
      const image = new Image()
      image.src = src
      image.onload = () => resolve(image)
    })
  }

  main()

  // работает, рисует машинку
  // if(ctx) {
  //   const imgTag = new Image()
  //   imgTag.src = 'http://i.stack.imgur.com/Rk0DW.png'
  //   // imgTag.onload = () => {
  //   //   console.log('imgTag')
  //   //   console.log(imgTag)
  //   //   // ctx.drawImage(imgTag, 0, 0, 200, 200)
  //   // }
  //   const animate = () => {
  //     console.log('dfg')
  //     // ctx?.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
  //     ctx?.drawImage(imgTag, 0, 0);
  //   }

  //   imgTag.onload = () => {animate()}

  // }
  function moveImage(x: number, y: number) {
    // const imageOffset = 120;
    // ctx?.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
    // ctx?.putImageData(imageL, x, y);
    console.log(ctx2)
    ctx?.drawImage(canvasT, 0, 0, 200, 200)
  }

  function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log('x: ' + x + ' y: ' + y)
    moveImage(x, y)
  }

  canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e)
  })
}
