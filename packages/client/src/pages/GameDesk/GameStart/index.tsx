import { Button, Typography } from '@mui/material'
import { MyStopwatch } from '../../../components/Stopwatch'
import { MyTimer } from '../../../components/Timer'

export const GameStart = () => {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 600) // 10 minutes timer
  return (
    <>
      <Typography variant="h6">Поиск противника</Typography>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disableElevation
        sx={{
          marginTop: 2,
        }}>
        Старт
      </Button>
      <MyTimer expiryTimestamp={time} />
      <MyStopwatch title="Поиск противника" subTitle="40-53" />
    </>
  )
}
