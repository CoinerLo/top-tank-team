import { Button, Typography } from '@mui/material'
import { MyStopwatch } from '../../../components/Stopwatch'
import { Container } from '@mui/material'
import { useState } from 'react'

export const GameStart = () => {
  const [valResetTimer, setvalResetTimer] = useState(false)

  const helpInfo = 'В затянувшемся бою следите за временем!'

  return (
    <Container
      disableGutters
      sx={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Случайный бой
      </Typography>
      <MyStopwatch
        title="Поиск противника"
        subTitle="40-53"
        runningMsg={['Идет поиск', 'Поиск прерван']}
        BtnPause={[true, 'Прервать поиск']}
        valReset={valResetTimer}
      />
      <Button
        onClick={() => {
          setvalResetTimer(!valResetTimer)
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
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        {helpInfo}
      </Typography>
    </Container>
  )
}
