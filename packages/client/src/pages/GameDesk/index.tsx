import { Box, Button, Container } from '@mui/material'
import { FC, useState } from 'react'
import { Deck } from '../../components/game/Deck/Deck'
import { Field } from '../../components/game/Field/Field'
import { Hand } from '../../components/game/Hand/Hand'
import { ResourceCounter } from '../../components/game/ResourceCounter/ResourceCounter'
import { TimerBox } from '../../components/game/TimerBox/TimerBox'
import { Game } from '../../gameCore/models/Game'
import { fieldsIcons } from '../../utils/consts'
import { Canvas } from '../../components/Canvas/Canvas'

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

interface IGameDesk {
  game: Game
}

export const GameDesk: FC<IGameDesk> = ({ game }) => {
  const [opponentDeck] = useState(34)
  const [opponentThrowDeck] = useState(2)
  const [userDeck] = useState(34)
  const [userThrowDeck] = useState(0)

  const [opponentCurrentCountResource] = useState(4)
  const [opponentFutureСountResource] = useState(4)
  const [userCurrentCountResource] = useState(5)
  const [userFutureСountResource] = useState(5)

  const handlerEndOfTurn = () => {
    console.log('Переход хода!')
  }
  console.log(game.getFullState())
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

          <Canvas />

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
