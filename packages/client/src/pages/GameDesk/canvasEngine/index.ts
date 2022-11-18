import { canvasEngine } from './canvasEngine'
import * as canvasDrawRect from './canvasEngine-drawRect'
import * as canvasDrawRound from './canvasEngine-drawRound'

let game = canvasEngine('#game')
game.element = [
  {
    position: { x: 0, y: 0 },
    drawRect: { w: 50, h: 50, c: '#ff0000' },
  },
  {
    position: { x: 50, y: 50 },
    drawRect: { x: 10, y: 10, w: 50, h: 50, c: '#5844ff' },
    drawRound: { w: 50, h: 50, r: 25, c: '#0000ff' },
  },
]
