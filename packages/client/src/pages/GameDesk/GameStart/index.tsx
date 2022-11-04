import { Box, Button, CardMedia, Typography } from '@mui/material'
import { MyStopwatch } from '../../../components/Stopwatch'
import { Container } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const GameStart = () => {
  const [valResetTimer, setvalResetTimer] = useState(false)
  const navigate = useNavigate()

  const helpInfo = 'В затянувшемся бою следите за временем!'

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
              Игрок 1
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}>
            <CardMedia
              component={'img'}
              image={'avatar_default.png'}
              sx={{
                height: '250px',
                width: '450px',
                margin: 'auto',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minWidth: '200px',
          }}>
          <CardMedia
            component={'img'}
            image={'random_fight_ico.png'}
            sx={{
              width: '40px',
            }}
          />
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', color: '#CB7007' }}>
            Случайный бой
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}>
          <Box>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Игрок 2
            </Typography>
          </Box>
          <Box>
            <CardMedia
              component={'img'}
              image={'world_default.png'}
              sx={{
                height: '250px',
                width: '450px',
                margin: 'auto',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
      </Box>
      <MyStopwatch
        title="Поиск противника"
        subTitle="40-53"
        runningMsg={['Идет поиск', 'Поиск прерван']}
        valReset={valResetTimer}
      />
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
        Прервать поиск
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
