import { Button, Typography } from '@mui/material'
import { textAlign } from '@mui/system'
import { MyStopwatch } from '../../../components/Stopwatch'

export const GameStart = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 600) // 10 minutes timer

  const helpInfo = 'В затянувшемся бою следите за временем!'

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Случайный бой
      </Typography>
      <MyStopwatch
        title="Поиск противника"
        subTitle="40-53"
        runningMsg={['Идет поиск', 'Поиск прерван']}
        BtnPause={[true, 'Прервать поиск']}
      />
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        {helpInfo}
      </Typography>
    </>
  )
}
