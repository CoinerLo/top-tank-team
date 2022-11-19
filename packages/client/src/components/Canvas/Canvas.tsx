import { useEffect, useRef } from 'react'
import { canvasEngine } from '../../pages/GameDesk/canvasEngine/canvasEngine'
import { HEIGHT, icanvas, WIDTH } from '../../pages/GameDesk/gameDeskCanvas'

export const destinationSquare = (x: number, y: number) => {
  const ySegment = Math.floor(y / 171)
  const xSegment = Math.floor(x / 171)
  const xResult = xSegment + 1

  switch (ySegment) {
    case 0:
      return { y: 'a', x: xResult }
    case 1:
      return { y: 'b', x: xResult }
    default:
      return { y: 'c', x: xResult }
  }
}

const coordinates = {
  a: {
    1: {},
  },
}

export const Canvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // const canvasT = document.getElementById('icanvasT') as HTMLCanvasElement
    // let icanvasRender = icanvas.bind(this)
    // icanvasRender(canvas)
    const canvas = canvasRef.current
    icanvas(canvas)
    canvas?.addEventListener('click', e => {
      // console.log(e)
    })
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
