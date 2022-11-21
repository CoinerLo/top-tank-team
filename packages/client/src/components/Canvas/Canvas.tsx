import React, { useEffect, useRef, memo, MouseEventHandler } from 'react'
import { decksOfTanksByTier, Tank } from '../../gameCore/models/TanksDeck'
import { destinationSquare } from '../../utils'
import { CanvasEngine } from '../../utils/canvasEngine/canvasEngine'
import {
  BattleCardIcons,
  DPI_HEIGHT,
  DPI_WIDTH,
  IconsByName,
} from '../../utils/consts'

const tank = decksOfTanksByTier.first[0]

interface IElementsCreator {
  type: string
  tank: Tank
  targetСell: string
}

const elementsCreator = ({ type, tank, targetСell }: IElementsCreator) => {
  const imgSrc = (IconsByName as Record<string, string>)[tank.name]
  const headImgSrc = (BattleCardIcons as Record<string, string>)[tank.type]

  return {
    type,
    position: { x: 0, y: DPI_HEIGHT - 170, cell: targetСell, isActive: false },
    cardImg: { w: 170, h: 170, src: './../cards/battleCard.png' },
    baseImg: { w: 150, h: 125, dx: 10, dy: 36, src: imgSrc },
    bringsResourcesIconImg: {
      w: 39,
      h: 39,
      dx: 129,
      dy: 2,
      src: './../cards/bringsResources.png',
    },
    headIconImg: { w: 20, h: 18, dx: 3, dy: 10, src: headImgSrc },
    headText: {
      text: tank.name,
      dx: 25,
      dy: 25,
      font: '10pt Arial',
      fillStyle: 'gray',
    },
    bringsResourcesText: {
      text: tank.bringsResources,
      dx: 145,
      dy: 31,
      font: 'bold 18px Arial',
      fillStyle: '#000',
    },
    damage: {
      text: tank.damage,
      dx: 12,
      dy: 105,
      font: 'bold 18px Arial',
      fillStyle: '#64CB3E',
    },
    health: {
      text: tank.health,
      dx: 12,
      dy: 145,
      font: 'bold 18px Arial',
      fillStyle: '#fff',
    },
  }
}

export const Canvas = memo(() => {
  const canvasRef = useRef(null)
  let game: CanvasEngine
  const element = elementsCreator({ type: 'card', tank, targetСell: 'C2' }) // Type переделать на tank или headquarters

  const elements = [
    {
      type: 'card',
      position: { x: 0, y: DPI_HEIGHT - 170, cell: 'C1', isActive: false },
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
        text: 1,
        dx: 12,
        dy: 105,
        font: 'bold 18px Arial',
        fillStyle: '#64CB3E',
      },
      health: {
        text: 22,
        dx: 10,
        dy: 145,
        font: 'bold 16px Arial',
        fillStyle: '#fff',
      },
    },
    element,
    {
      position: { x: 0, y: 0 },
      grid: { c: 'rgba(255, 255, 255, 0.3)', lineWidth: 1 },
    },
  ]

  useEffect(() => {
    game = new CanvasEngine(canvasRef.current, { DPI_WIDTH, DPI_HEIGHT })
    game.elements = elements
    game.render()
  }, [])

  const handleClick = (event: React.MouseEvent) => {
    const { x, y } = destinationSquare(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
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
