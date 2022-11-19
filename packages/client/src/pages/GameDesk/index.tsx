import { Box, Button, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BattleCard } from '../../components/game/BattleCard/BattleCard'
import { Deck } from '../../components/game/Deck/Deck'
import { Field } from '../../components/game/Field/Field'
import { Hand } from '../../components/game/Hand/Hand'
import { ResourceCounter } from '../../components/game/ResourceCounter/ResourceCounter'
import { TimerBox } from '../../components/game/TimerBox/TimerBox'
import { fullHeadquartersDeck } from '../../gameCore/models/HeadquartersDeck'
import { fieldsIcons } from '../../utils/consts'
import { icanvas } from './gameDeskCanvas'
import { canvasEngine } from './canvasEngine/canvasEngine'

const opponentCardsInHand = [{}, {}, {}, {}]
const userCardsInHand = [{}, {}, {}, {}, {}, {}]

const styles = {
  userLine: {
    position: 'relative',
    justifyContent: 'center',
    display: 'flex',
    paddingX: '90px',
  },
  playingField: {
    width: '856px',
    height: '514px',
    border: '1px solid #fff',
  },
  endOfTurnButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '64px',
    height: '60px',
    padding: '10px',
    flexWrap: 'wrap',
    fontSize: '14px',
  },
}

export const GameDesk = () => {
  const [opponentDeck] = useState(34)
  const [opponentThrowDeck] = useState(2)
  const [userDeck] = useState(34)
  const [userThrowDeck] = useState(0)

  const [opponentCurrentCountResource] = useState(4)
  const [opponentFutureСountResource] = useState(4)
  const [userCurrentCountResource] = useState(5)
  const [userFutureСountResource] = useState(5)

  const params = useParams()
  console.log(params.gameId)

  const handlerEndOfTurn = () => {
    console.log('Переход хода!')
  }

  // useEffect(() => {
  //   const canvas = document.getElementById('icanvas') as HTMLCanvasElement
  //   const canvasT = document.getElementById('icanvasT') as HTMLCanvasElement
  //   // let icanvasRender = icanvas.bind(this)
  //   // icanvasRender(canvas)
  //   icanvas(canvas, canvasT)
  // }, [])

  useEffect(() => {
    const DPI_WIDTH = 854
    const DPI_HEIGHT = 512
    let game = canvasEngine('#icanvas', {DPI_WIDTH, DPI_HEIGHT})
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
        position: { x: 0, y: DPI_HEIGHT - 170, cell: 'A5' },
        cardImg: { w: 170, h: 170, src: './../cards/battleCard.png'},
        baseImg: {w: 150, h: 125, dx: 10, dy: 36, src: './../cards/images/headquarters/ussr-image.png'},
        bringsResourcesIconImg: {w: 39, h: 39, dx: 129, dy: 2, src: './../cards/bringsResources.png'},
        headIconImg: {w: 20, h: 18, dx: 3, dy: 10, src: './../cards/icons/head-icon.png'},
        headText: {text: 'Учебная часть', dx:25, dy:25, font: '10pt Arial', fillStyle: 'gray'},
        bringsResourcesText: {text: '5', dx:143, dy:31, font: 'bold 16pt Arial', fillStyle: '#000'},
      },
      {
        type: 'card',
        position: { x: 0, y: DPI_HEIGHT - 170, cell: 'C1' },
        cardImg: { w: 170, h: 170, src: './../cards/battleCard.png'},
        baseImg: {w: 150, h: 125, dx: 10, dy: 36, src: './../cards/images/headquarters/ussr-image.png'},
        bringsResourcesIconImg: {w: 39, h: 39, dx: 129, dy: 2, src: './../cards/bringsResources.png'},
        headIconImg: {w: 20, h: 18, dx: 3, dy: 10, src: './../cards/icons/head-icon.png'},
        headText: {text: 'Учебная часть', dx:25, dy:25, font: '10pt Arial', fillStyle: 'gray'},
        bringsResourcesText: {text: '5', dx:143, dy:31, font: 'bold 16pt Arial', fillStyle: '#000'},
      },
      {
        position: { x: 0, y: 0 },
        setka: {c: 'white', lineWidth: 1,}
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

  return (
    <Container disableGutters>
      <Box sx={{ my: '10px', mx: 'auto' }}>
        <Box sx={styles.userLine}>
          <Hand cardsInHand={opponentCardsInHand} />
          <Box sx={{ position: 'absolute', right: -30 }}>
            <Deck
              userName="opponent"
              cardCountInDeck={opponentDeck}
              cardCountThrown={opponentThrowDeck}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', my: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', mr: '10px' }}>
            {fieldsIcons.map((field, idx) => (
              <Field url={field} key={idx} />
            ))}
            <TimerBox />
            <Box sx={{ mt: '15px' }}>
              <ResourceCounter
                currentCount={userCurrentCountResource}
                futureСount={userFutureСountResource}
              />
            </Box>
          </Box>

          {/* <Box sx={styles.playingField}>
            <Box
              sx={{
                display: 'flex',
                height: '171px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              }}>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box sx={{ width: '170px', height: '170px' }}></Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '171px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              }}>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box sx={{ width: '170px', height: '170px' }}></Box>
            </Box>
            <Box sx={{ display: 'flex', height: '170px' }}>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}>
                <BattleCard
                  card={fullHeadquartersDeck[2]}
                  battleCardType="training"
                />
              </Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box
                sx={{
                  width: '171px',
                  height: '170px',
                  borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                }}></Box>
              <Box sx={{ width: '170px', height: '170px' }}></Box>
            </Box>
          </Box> */}

          <canvas id="icanvas" width={854} height={512} style={{ border: '2px solid white' }}></canvas>
          {/* <canvas id="icanvasT" width={200} height={200}></canvas> */}

          <Box sx={{ display: 'flex', flexDirection: 'column', ml: '10px' }}>
            <TimerBox />
            <Box mb="15px">
              <ResourceCounter
                currentCount={opponentCurrentCountResource}
                futureСount={opponentFutureСountResource}
              />
            </Box>
            {fieldsIcons.map((field, idx) => (
              <Field url={field} key={idx} />
            ))}
          </Box>
        </Box>
        <Box sx={styles.userLine}>
          <Box sx={{ position: 'absolute', left: -30 }}>
            <Deck
              userName="user name"
              cardCountInDeck={userDeck}
              cardCountThrown={userThrowDeck}
            />
          </Box>
          <Hand cardsInHand={userCardsInHand} />
          <Button
            variant="sub"
            type="button"
            onClick={handlerEndOfTurn}
            sx={styles.endOfTurnButton}>
            Конец хода
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
