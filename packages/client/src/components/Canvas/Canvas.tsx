import { useEffect, useRef } from 'react'
import { canvasEngine } from '../../pages/GameDesk/canvasEngine/canvasEngine'
// import { HEIGHT, icanvas, WIDTH } from '../../pages/GameDesk/gameDeskCanvas'

export const destinationSquare = (x: number, y: number) => {
  const ySegment = Math.floor(y / 171)
  const xSegment = Math.floor(x / 171)
  const xResult = xSegment + 1

  switch (ySegment) {
    case 0:
      return { y: 'A', x: xResult }
    case 1:
      return { y: 'B', x: xResult }
    default:
      return { y: 'C', x: xResult }
  }
}

export const coordinates = {
  'A1': {x:0,y:0},
  'A2': {x:171,y:0},
  'A3': {x:342,y:0},
  'A4': {x:513,y:0},
  'A5': {x:684,y:0},
  'B1': {x:0,y:171},
  'B2': {x:171,y:171},
  'B3': {x:342,y:171},
  'B4': {x:513,y:171},
  'B5': {x:684,y:171},
  'C1': {x:0,y:342},
  'C2': {x:171,y:342},
  'C3': {x:342,y:342},
  'C4': {x:513,y:342},
  'C5': {x:684,y:342},
}

export const Canvas = () => {
  const canvasRef = useRef(null)

  // useEffect(() => {
  //   // const canvasT = document.getElementById('icanvasT') as HTMLCanvasElement
  //   // let icanvasRender = icanvas.bind(this)
  //   // icanvasRender(canvas)
  //   const canvas = canvasRef.current
  //   icanvas(canvas)
  //   canvas?.addEventListener('click', e => {
  //     // console.log(e)
  //   })
  // }, [])

  useEffect(() => {
    const DPI_WIDTH = 854
    const DPI_HEIGHT = 512
    let game = canvasEngine(canvasRef.current, {DPI_WIDTH, DPI_HEIGHT})
    game.elements = [
      // {
      //   position: { x: 0, y: 0 },
      //   drawRect: { w: 50, h: 50, c: '#ff0000' },
      // },
      // {
      //   position: { x: 50, y: 50 },
      //   drawRect: { x: 10, y: 10, w: 50, h: 50, c: '#5844ff' },
      //   drawRound: { w: 50, h: 50, r: 25, c: '#0000ff' },
      //   mouse: { x: 50, y: 50, w: 50, h: 50 },
      //   beforeRender: (_: any, element: any) => {
      //     element.mouse.x = element.position.x
      //     element.mouse.y = element.position.y
      //   },
      //   mouseover: () => {
      //     console.log('mouseover')
      //   },
      //   mouseoff: () => {
      //     console.log('mouseoff')
      //   },
      //   click: () => {
      //     console.log('click', game)
      //     game.elements[1].position = { x: 100, y: 100 }
      //   },
      // },
      {
        type: 'card',
        position: { x: 0, y: DPI_HEIGHT - 170, cell: 'A5', status: false },
        cardImg: { w: 170, h: 170, src: './../cards/battleCard.png'},
        baseImg: {w: 150, h: 125, dx: 10, dy: 36, src: './../cards/images/headquarters/ussr-image.png'},
        bringsResourcesIconImg: {w: 39, h: 39, dx: 129, dy: 2, src: './../cards/bringsResources.png'},
        headIconImg: {w: 20, h: 18, dx: 3, dy: 10, src: './../cards/icons/head-icon.png'},
        headText: {text: 'Учебная часть', dx:25, dy:25, font: '10pt Arial', fillStyle: 'gray'},
        bringsResourcesText: {text: '5', dx:143, dy:31, font: 'bold 16pt Arial', fillStyle: '#000'},
      },
      {
        type: 'card',
        position: { x: 0, y: DPI_HEIGHT - 170, cell: 'C1', status: false },
        cardImg: { w: 170, h: 170, src: './../cards/battleCard.png'},
        baseImg: {w: 150, h: 125, dx: 10, dy: 36, src: './../cards/images/headquarters/ussr-image.png'},
        bringsResourcesIconImg: {w: 39, h: 39, dx: 129, dy: 2, src: './../cards/bringsResources.png'},
        headIconImg: {w: 20, h: 18, dx: 3, dy: 10, src: './../cards/icons/head-icon.png'},
        headText: {text: 'Учебная часть', dx:25, dy:25, font: '10pt Arial', fillStyle: 'gray'},
        bringsResourcesText: {text: '5', dx:143, dy:31, font: 'bold 16pt Arial', fillStyle: '#000'},
      },
      {
        position: { x: 0, y: 0 },
        grid: {c: 'white', lineWidth: 1,}
      },
      // {
      //   position: { x: 0, y: DPI_HEIGHT - 170 },
      //   img: {src: './../cards/battleCard.png'}
      // },
      // {
      //   position: { x: 0 + 14, y: DPI_HEIGHT - 170 + 36, dw: 145, dh: 127 },
      //   img: {src: './../cards/images/headquarters/ussr-image.png'}
      // },
      // {
      //   position: { x: 0 + 120, y: DPI_HEIGHT - 170, dw: 50, dh: 50 },
      //   img: {src: './../cards/bringsResources.png'}
      // },
      // {
      //   position: { x: 0 + 3, y: DPI_HEIGHT - 165, dw: 25, dh: 25 },
      //   img: {src: './../cards/icons/head-icon.png'}
      // },
      // {
      //   position: { x: 0 + 30, y: DPI_HEIGHT - 150 },
      //   text: {font: '10pt Arial', fillStyle: 'gray', text: 'Учебная часть'}
      // },
      // {
      //   position: { x: 0 + 142, y: DPI_HEIGHT - 135 },
      //   text: {font: 'bold 16pt Arial', fillStyle: '#000', text: '5'}
      // },
    ]
    game.render()
    console.log(game)
  }, [])

  // useEffect(() => {
  //   const game = canvasEngine('#icanvas', { interval: 60 })
  //   game.elements = [
  //     {
  //       position: { x: 0, y: 0 },
  //       drawLine: { c: '#fff' }
  //     },
  //     {
  //       position: { x: 0, y: 0 },
  //       drawRect: { w: 50, h: 50, c: '#ff0000' },
  //     },
  //     {
  //       position: { x: 50, y: 50 },
  //       drawRect: { x: 10, y: 10, w: 50, h: 50, c: '#5844ff' },
  //       drawRound: { w: 50, h: 50, r: 25, c: '#0000ff' },
  //       mouse: { x: 50, y: 50, w: 50, h: 50 },
  //       beforeRender: (_: any, element: any) => {
  //         element.mouse.x = element.position.x
  //         element.mouse.y = element.position.y
  //       },
  //       mouseover: () => {
  //         console.log('mouseover')
  //       },
  //       mouseoff: () => {
  //         console.log('mouseoff')
  //       },
  //       click: () => {
  //         console.log('click', game)
  //         game.elements[1].position = { x: 100, y: 100 }
  //       },
  //     },
  //   ]
  // }, [])

  return (
    <canvas
      id="icanvas"
      ref={canvasRef}
      style={{
        width: '856px',
        height: '514px',
        border: '1px solid white',
      }}></canvas>
  )
}