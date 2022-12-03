import { Box, Button, Container, Modal, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { Deck } from '../../components/game/Deck/Deck'
import { Field } from '../../components/game/Field/Field'
import { Hand } from '../../components/game/Hand/Hand'
import { ResourceCounter } from '../../components/game/ResourceCounter/ResourceCounter'
import { TimerBox } from '../../components/game/TimerBox/TimerBox'
import { CurrentGamer, Game } from '../../gameCore/models/Game'
import { AppRoute, fieldsIcons } from '../../utils/consts'
import { Canvas } from '../../components/Canvas/Canvas'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import FlagIcon from '@mui/icons-material/Flag'
import { useNavigate } from 'react-router-dom'
import { Tank } from '../../gameCore/models/TanksDeck'
import { GameDeskSegmentKeyType } from '../../gameCore/types'

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
  fullscreenIcon: {
    position: 'absolute',
    right: '50px',
    top: '50px',
    cursor: 'pointer',
  },
  flagIcon: {
    position: 'absolute',
    left: '50px',
    top: '50px',
    cursor: 'pointer',
  },
  flagModalWindow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '200px',
    padding: '20px',
    background: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
    borderRadius: '8px',
  },
}

interface IGameDesk {
  game: Game
}

export const GameDesk: FC<IGameDesk> = ({ game }) => {
  const navigate = useNavigate()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isOpenFlagModalWindow, setIsOpenFlagModalWindow] = useState(false)
  const [activeCardInHand, setActiveCardInHand] = useState('')
  const [activeCardInDesk, setActiveCardInDesk] = useState<
    GameDeskSegmentKeyType | ''
  >('')

  const [currentGamer, setCurrentGamer] = useState(game.currentGamer)

  const userState = game.getUserState()
  const userName = userState.getUserName()
  const userHeadquarters = userState.getHeadquarters()
  const [userHand, setUserHand] = useState(userState.getCardsInHand())

  const opponentState = game.getOpponentState()
  const opponentName = opponentState.getUserName()
  const opponentHeadquarters = opponentState.getHeadquarters()
  const [opponentHand, setOpponentHand] = useState(
    opponentState.getCardsInHand()
  )

  const [opponentDeck] = useState(opponentState.getCountCardsInDeck())
  const [opponentThrowDeck] = useState(0)
  const [userDeck] = useState(userState.getCountCardsInDeck())
  const [userThrowDeck] = useState(0)

  const [opponentCurrentCountResource] = useState(
    opponentHeadquarters.bringsResources
  )
  const [opponentFutureСountResource] = useState(
    opponentHeadquarters.bringsResources
  )
  const [userCurrentCountResource] = useState(userHeadquarters.bringsResources)
  const [userFutureСountResource] = useState(userHeadquarters.bringsResources)

  const [deskState, setDeskState] = useState(game.getDesk().getGamingDesk())

  const handlerEndOfTurn = () => {
    if (activeCardInDesk) {
      setActiveCardInDesk('')
      game.getDesk().toggleActiveVehicleOnDesk(activeCardInDesk, currentGamer)
    }
    if (activeCardInHand) {
      setActiveCardInHand('')
    }
    setCurrentGamer(prev =>
      prev === CurrentGamer.user ? CurrentGamer.opponent : CurrentGamer.user
    )
  }

  const handleClickFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleClickFlag = () => {
    setIsOpenFlagModalWindow(!isOpenFlagModalWindow)
  }

  const handleClickOnYes = () => {
    navigate(`/${AppRoute.Game}/${AppRoute.ResultGame}/${game.id}`, {
      replace: true,
    })
  }

  const handleChoiceActiveCardInHand = useCallback((idCard: string) => {
    setActiveCardInHand(idCard)
  }, [])

  const handleClickOnCanvas = useCallback(
    (grid: GameDeskSegmentKeyType) => {
      const gameDesk = game.getDesk()
      if (
        activeCardInHand &&
        gameDesk.isAccessibleGridForLanding(grid, currentGamer)
      ) {
        const newTankOnDesk =
          currentGamer === CurrentGamer.user
            ? (userState.takeCardFromHand(activeCardInHand) as Tank)
            : (opponentState.takeCardFromHand(activeCardInHand) as Tank)

        if (newTankOnDesk) {
          if (currentGamer === CurrentGamer.user) {
            setUserHand(userState.getCardsInHand())
          } else {
            setOpponentHand(opponentState.getCardsInHand())
          }

          const nextVersionDesk = gameDesk.addVehicleOnDesk(
            grid,
            newTankOnDesk,
            currentGamer
          )

          if (nextVersionDesk) {
            setDeskState(nextVersionDesk)
          }

          setActiveCardInHand('')
        }

        return true
      }

      if (!activeCardInDesk) {
        const isChangeActiveCardInDesk = gameDesk.toggleActiveVehicleOnDesk(
          grid,
          currentGamer
        )
        if (isChangeActiveCardInDesk) {
          setActiveCardInDesk(grid)
        }
        return isChangeActiveCardInDesk
      }

      if (activeCardInDesk === grid) {
        setActiveCardInDesk('')
        return gameDesk.toggleActiveVehicleOnDesk(grid, currentGamer)
      }

      if (activeCardInDesk) {
        if (deskState[grid] === null) {
          const nextVersionDesk = gameDesk.moveVehicleOnDesk(
            activeCardInDesk,
            grid
          )

          if (nextVersionDesk) {
            setDeskState(nextVersionDesk)
          }

          setActiveCardInDesk('')
          const isToogle = gameDesk.toggleActiveVehicleOnDesk(
            grid,
            currentGamer
          )
          if (!isToogle) {
            gameDesk.toggleActiveVehicleOnDesk(activeCardInDesk, currentGamer)
          }
          return isToogle
        }

        if (deskState[grid] !== null) {
          console.log('здесь будет взаимодействие карточек')
        }
      }

      return false
    },
    [activeCardInHand, userHand, opponentHand, activeCardInDesk, deskState]
  )

  return (
    <Container disableGutters sx={{ overflow: 'hidden' }}>
      <Box sx={{ my: '10px', mx: 'auto' }}>
        <Box sx={styles.userLine}>
          <Hand
            isActive={currentGamer === CurrentGamer.opponent}
            cardsInHand={opponentHand}
            isOpponent={true}
            handleChoiceActiveCardInHand={handleChoiceActiveCardInHand}
          />
          <Box sx={{ position: 'absolute', right: -30 }}>
            <Deck
              userName={opponentName}
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

          <Canvas
            handleClickOnCanvas={handleClickOnCanvas}
            elements={deskState}
          />

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
              userName={userName}
              cardCountInDeck={userDeck}
              cardCountThrown={userThrowDeck}
            />
          </Box>
          <Hand
            isActive={currentGamer === CurrentGamer.user}
            cardsInHand={userHand}
            isOpponent={false}
            handleChoiceActiveCardInHand={handleChoiceActiveCardInHand}
          />
          <Button
            variant="sub"
            type="button"
            onClick={handlerEndOfTurn}
            sx={styles.endOfTurnButton}>
            Конец хода
          </Button>
        </Box>
      </Box>
      <Box sx={styles.fullscreenIcon} onClick={handleClickFullscreen}>
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </Box>
      <Box sx={styles.flagIcon} onClick={handleClickFlag}>
        <FlagIcon />
      </Box>
      <Modal
        disableAutoFocus
        open={isOpenFlagModalWindow}
        onClose={handleClickFlag}>
        <Box sx={styles.flagModalWindow}>
          <Typography variant="h2" color="red" mt="50px" mb="20px">
            Вы уверены что хотите сдаться?
          </Typography>
          <Button
            type="button"
            onClick={handleClickOnYes}
            sx={{ color: 'red', mr: '30px' }}>
            Да
          </Button>
          <Button
            type="button"
            onClick={handleClickFlag}
            sx={{ color: 'green' }}>
            Нет
          </Button>
        </Box>
      </Modal>
    </Container>
  )
}
