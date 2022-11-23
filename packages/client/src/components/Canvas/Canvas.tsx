import React, { useEffect, useRef, memo } from 'react'
import { decksOfTanksByTier } from '../../gameCore/models/TanksDeck'
import { destinationSquare } from '../../utils'
import { ElementsCreator } from '../../utils/canvasEngine/canvasElement'
import { CanvasEngine } from '../../utils/canvasEngine/canvasEngine'
import { DPI_HEIGHT, DPI_WIDTH } from '../../utils/consts'

const tank = decksOfTanksByTier.first[0]

export const Canvas = memo(() => {
  const canvasRef = useRef(null)
  let game: CanvasEngine
  const element = new ElementsCreator({ type: 'card', tank, targetСell: 'C2' }) // Type переделать на tank или headquarters

  const elements = [
    {
      type: 'card',
      position: { x: 0, y: DPI_HEIGHT - 170, cell: 'C1' },
      cardImg: { w: 170, h: 170, src: './../cards/battleCard.png' },
      baseImg: {
        w: 150,
        h: 125,
        dx: 10,
        dy: 36,
        src: './../cards/images/headquarters/ussr-image.png',
      },
      bringsResourcesIconImg: {
        w: 39,
        h: 39,
        dx: 129,
        dy: 2,
        src: './../cards/bringsResources.png',
      },
      headIconImg: {
        w: 20,
        h: 18,
        dx: 3,
        dy: 10,
        src: './../cards/icons/head-icon.png',
      },
      headText: {
        text: 'Учебная часть',
        dx: 25,
        dy: 25,
        font: '10pt Arial',
        fillStyle: 'gray',
      },
      bringsResourcesText: {
        text: '5',
        dx: 143,
        dy: 31,
        font: 'bold 16pt Arial',
        fillStyle: '#000',
      },
      damage: {
        text: '1',
        dx: 12,
        dy: 105,
        font: 'bold 18px Arial',
        fillStyle: '#64CB3E',
      },
      health: {
        text: '22',
        dx: 10,
        dy: 145,
        font: 'bold 16px Arial',
        fillStyle: '#fff',
      },
    },
    element.getElement(),
  ]

  const grid = [
    {
      type: 'grid',
      position: { x: 0, y: 0 },
      grid: { c: 'rgba(255, 255, 255, 0.3)', lineWidth: 1 },
    },
  ]

  useEffect(() => {
    if (canvasRef.current) {
      game = new CanvasEngine(canvasRef.current, { DPI_WIDTH, DPI_HEIGHT })
      game.setElements(elements)
      game.setGrid(grid)
      game.render()
    }
  }, [])

  const handleClick = (event: React.MouseEvent) => {
    const { x, y } = destinationSquare(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    )
    const cell = `${y}${x}`
    game.click(cell)
  }

  return (
    <canvas
      onClick={handleClick}
      id="icanvas"
      ref={canvasRef}
      style={{
        width: '856px',
        height: '514px',
        border: '1px solid white',
      }}></canvas>
  )
})
