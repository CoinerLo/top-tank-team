import { Box, Button, Container, Modal, Typography } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'
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
import { GameDeskSegmentKeyType } from '../../gameCore/types'
import { useAppDispatch } from '../../hooks'
import { saveGame } from '../../store/slices/gameSlice/gameSlice'

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
  const dispatch = useAppDispatch()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isOpenFlagModalWindow, setIsOpenFlagModalWindow] = useState(false)
  const [isOpenEndOfTurnModalWindow, setIsOpenEndOfTurnModalWindow] =
    useState(false)
  const [activeCardInHand, setActiveCardInHand] = useState('')
  const [activeCardInDesk, setActiveCardInDesk] = useState<
    GameDeskSegmentKeyType | ''
  >('')

  const [currentGamer, setCurrentGamer] = useState(game.currentGamer)

  const [userState, setUserState] = useState(game.getUserState())
  const userName = userState.getUserName()

  const [opponentState, setOpponentState] = useState(game.getOpponentState())
  const opponentName = opponentState.getUserName()

  const [deskState, setDeskState] = useState(game.getDesk().getGamingDesk())

  const endGame = () => {
    dispatch(saveGame({ data: game }))
    navigate(`/${AppRoute.Game}/${AppRoute.ResultGame}/${game.id}`, {
      replace: true,
    })
  }

  const handlerEndOfTurn = () => {
    setIsOpenEndOfTurnModalWindow(true)
    if (activeCardInDesk) {
      setActiveCardInDesk('')
      game.getDesk().toggleActiveVehicleOnDesk(activeCardInDesk, currentGamer)
    }
    if (activeCardInHand) {
      setActiveCardInHand('')
    }
    const nextGamer = game.changeCurrentGamer()
    if (!nextGamer) {
      endGame()
      return
    }
    setOpponentState(game.getOpponentState())
    setUserState(game.getUserState())
    setCurrentGamer(nextGamer)
  }

  const handleClickFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleClickFlag = () => {
    setIsOpenFlagModalWindow(!isOpenFlagModalWindow)
  }

  const handleClickOnYes = () => {
    game.endGameWithWhiteFlag()
    endGame()
  }

  const handleChoiceActiveCardInHand = useCallback((idCard: string) => {
    setActiveCardInHand(idCard)
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const handleClickOnCanvas = useCallback(
    (grid: GameDeskSegmentKeyType) => {
      const gameDesk = game.getDesk()
      if (
        activeCardInHand &&
        gameDesk.isAccessibleGridForLanding(grid, currentGamer)
      ) {
        const nextVersionDesk = game.addVehicleOnDesk(
          grid,
          currentGamer,
          activeCardInHand
        )

        if (nextVersionDesk) {
          setDeskState(game.getDesk().getGamingDesk())
        }

        setActiveCardInHand('')

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

        const card = deskState[grid]
        if (card && !card.isYouVehicleOwner(currentGamer)) {
          const resultAttack = game.cardAttack(activeCardInDesk, grid)
          const isEndOfThisGame = game.isEndOfThisGame()
          if (isEndOfThisGame) {
            endGame()
          } else if (resultAttack) {
            setActiveCardInDesk('')
            setDeskState(game.Desk.gamingDesk)
            setUserState(game.getUserState())
            setOpponentState(game.getOpponentState())
          }
        }
      }

      return false
    },
    [
      activeCardInHand,
      activeCardInDesk,
      userState,
      opponentState,
      deskState,
      currentGamer,
    ]
  )

  return (
    <Container disableGutters sx={{ overflow: 'hidden' }}>
      <Box sx={{ my: '10px', mx: 'auto' }}>
        <Box sx={styles.userLine}>
          <Hand
            isActive={
              currentGamer === CurrentGamer.opponent &&
              !isOpenEndOfTurnModalWindow
            }
            cardsInHand={opponentState.getCardsInHand()}
            isOpponent={true}
            handleChoiceActiveCardInHand={handleChoiceActiveCardInHand}
          />
          <Box sx={{ position: 'absolute', right: -30 }}>
            <Deck
              userName={opponentName}
              cardCountInDeck={opponentState.getCountCardsInDeck()}
              cardCountThrown={opponentState.getCountOfDiscardedCards()}
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
                currentCount={userState.getCurrentCountResources()}
                futureСount={userState.getFutureСountResources()}
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
                currentCount={opponentState.getCurrentCountResources()}
                futureСount={opponentState.getFutureСountResources()}
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
              cardCountInDeck={userState.getCountCardsInDeck()}
              cardCountThrown={userState.getCountOfDiscardedCards()}
            />
          </Box>
          <Hand
            isActive={
              currentGamer === CurrentGamer.user && !isOpenEndOfTurnModalWindow
            }
            cardsInHand={userState.getCardsInHand()}
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
      <Modal open={isOpenEndOfTurnModalWindow}>
        <Box sx={styles.flagModalWindow}>
          <Typography variant="h1" color="#974201" mt="10px" mb="10px">
            Переход хода!
          </Typography>
          <Typography variant="h3" color="#974201" mb="10px">
            Сейчас ходит
          </Typography>
          <Typography variant="h3" color="#64CB3E" mt="5px" mb="20px">
            {currentGamer === CurrentGamer.user ? userName : opponentName}
          </Typography>
          <Button
            type="button"
            onClick={() => setIsOpenEndOfTurnModalWindow(false)}
            sx={{ color: '#64CB3E' }}>
            Да
          </Button>
        </Box>
      </Modal>
    </Container>
  )
}
