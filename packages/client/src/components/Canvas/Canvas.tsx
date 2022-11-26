import React, { useEffect, useRef, memo, FC } from 'react'
import { destinationSquare } from '../../utils'
import { CanvasEngine } from '../../utils/canvasEngine/canvasEngine'
import { IElement } from '../../utils/canvasEngine/canvasTypings'
import { DPI_HEIGHT, DPI_WIDTH } from '../../utils/consts'

interface ICanvasProps {
  handleClickOnCanvas: (grid: string) => void
  elements: IElement[]
}

export const Canvas: FC<ICanvasProps> = memo(
  ({ handleClickOnCanvas, elements }) => {
    const canvasRef = useRef(null)
    let game: CanvasEngine

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
    }, [handleClickOnCanvas, elements])

    const handleClick = (event: React.MouseEvent) => {
      const { x, y } = destinationSquare(
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY
      )
      const cell = `${y}${x}`
      game.click(cell)
      handleClickOnCanvas(cell)
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
  }
)
