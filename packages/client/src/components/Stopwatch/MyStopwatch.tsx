import { Box, Button } from '@mui/material'
import { FC, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import fist from '../../assets/img/fist.png'

interface MyStopwatchProps {
  title: string
  subTitle: string
  runningMsg: Array<string>
  BtnStart?: [boolean, string]
  BtnPause?: [boolean, string]
  BtnReset?: [boolean, string]
  valReset: boolean
}

export const MyStopwatch: FC<MyStopwatchProps> = ({
  title,
  subTitle,
  runningMsg,
  BtnStart = [false, 'Start'],
  BtnPause = [false, 'Pause'],
  BtnReset = [false, 'Reset'],
  valReset,
}) => {
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: true,
  })

  const [isBtnStart, BtnStartTxt] = BtnStart
  const [isBtnPause, BtnPauseTxt] = BtnPause
  const [isBtnReset, BtnResetTxt] = BtnReset

  useEffect(() => {
    reset()
  }, [valReset])

  return (
    <Box sx={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>
        <img src={fist}></img>
        {subTitle}
      </p>
      <Box sx={{ fontSize: '50px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </Box>
      <p>{isRunning ? runningMsg[0] : runningMsg[1]}</p>
      {isBtnStart && <Button onClick={start}>{BtnStartTxt}</Button>}
      {isBtnPause && <Button onClick={pause}>{BtnPauseTxt}</Button>}
      {isBtnReset && (
        <Button
          onClick={() => {
            reset()
          }}>
          {BtnResetTxt}
        </Button>
      )}
    </Box>
  )
}
