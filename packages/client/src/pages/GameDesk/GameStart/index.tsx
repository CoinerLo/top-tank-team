import { Box, Button, CardMedia, TextField, Typography } from '@mui/material'
import { MyStopwatch } from '../../../components/Stopwatch/MyStopwatch'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeadquartersSelection } from '../../../components/HeadquartersSelection/HeadquartersSelection'
import { ReadyFight } from '../../../components/ReadyFight/ReadyFight'
import { HeadquartersPreview } from '../../../components/HeadquartersPreview/HeadquartersPreview'
import { getHeadquartersPreview } from '../../../utils/consts'
import { IUserData } from '../../../gameCore/types'
import { getRandomUserDeck } from '../../../gameCore/mockData'
import { COUNT_CARDS_IN_PLAYER_DECK } from '../../../gameCore/consts'
import { Game } from '../../../gameCore/models/Game'

export const GameStart = () => {
  const [valResetTimer, setvalResetTimer] = useState(false)
  const navigate = useNavigate()
  const [userHeadquarters, setUserHeadquarters] = useState('')
  const [opponentHeadquarters, setOpponentHeadquarters] = useState('')
  const [userHeadquartersAvatar, setUserHeadquartersAvatar] = useState(
    getHeadquartersPreview('')
  )
  const [opponentHeadquartersAvatar, setOpponentHeadquartersAvatar] = useState(
    getHeadquartersPreview('')
  )

  const baseOpponentName = 'Оппонент'
  const [opponentName, setOpponentName] = useState(baseOpponentName)
  const helpInfo = 'Выберите свой штаб главнокомандующего!'
  const userName = 'Игрок' // из редакса потом будем брать

  useEffect(() => {
    if (userHeadquarters && opponentHeadquarters) {
      const userData: IUserData = {
        userName,
        deck: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK), // поменяем когда будет готов набор колоды
        headquartersName: userHeadquarters,
      }
      const opponentData: IUserData = {
        userName: opponentName ?? baseOpponentName,
        deck: getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK), // поменяем когда будет готов набор колоды
        headquartersName: opponentHeadquarters,
      }
      const newGame = new Game({ userData, opponentData })
      // далее этот объект будем записывать в стор, и брать его оттуда уже на странице игры
      // либо возможно как-то иначе, в любом случае еще доработаем
      const { id } = newGame

      navigate(`/game/${id}`)
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpponentName(event.target.value)
  }

  const resetTimer = () => {
    setvalResetTimer(!valResetTimer)
    navigate('/headquarters')
  }

  return (
    <Container
      disableGutters
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '280px',
          width: '100%',
          mt: '40px',
        }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}>
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {userName}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}>
            <HeadquartersPreview
              url={getHeadquartersPreview(userHeadquartersAvatar)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '220px',
          }}>
          <CardMedia
            component={'img'}
            image={'random_fight_ico.png'}
            sx={{
              width: '40px',
              mr: '10px',
            }}
          />
          <Typography variant="h6" color="secondary">
            Бой лицом к лицу
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="opponentName"
              label="Введите ник"
              multiline
              maxRows={1}
              value={opponentName}
              onChange={handleChange}
              variant="standard"
            />
          </Box>
          <Box>
            <HeadquartersPreview
              url={getHeadquartersPreview(opponentHeadquartersAvatar)}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        {userHeadquarters ? (
          <ReadyFight />
        ) : (
          <HeadquartersSelection
            setHeadquarters={setUserHeadquarters}
            setAvatar={setUserHeadquartersAvatar}
          />
        )}
        <MyStopwatch
          title="Подготовка техники"
          subTitle="40-53"
          runningMsg={['Ждем готовности', 'Поиск прерван']}
          valReset={valResetTimer}
        />
        {opponentHeadquarters ? (
          <ReadyFight />
        ) : (
          <HeadquartersSelection
            setHeadquarters={setOpponentHeadquarters}
            setAvatar={setOpponentHeadquartersAvatar}
          />
        )}
      </Box>
      <Button
        onClick={() => {
          resetTimer()
        }}
        variant="sub"
        fullWidth
        disableElevation
        sx={{
          alignSelf: 'center',
          marginTop: '1rem',
        }}>
        Прервать подготовку
      </Button>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80px',
          color: '#fff',
          background: '#000',
          borderTop: '1px solid #fff',
          borderBottom: '1px solid #fff',
        }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {helpInfo}
        </Typography>
      </Box>
    </Container>
  )
}
