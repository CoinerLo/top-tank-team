import { useEffect } from 'react'
import { FC } from 'react'
import { useStopwatch } from 'react-timer-hook'

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
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true })

  const [isBtnStart, BtnStartTxt] = BtnStart
  const [isBtnPause, BtnPauseTxt] = BtnPause
  const [isBtnReset, BtnResetTxt] = BtnReset

  useEffect(() => {
    reset()
  }, [valReset])

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>{title}</h1>
        <p>{subTitle}</p>
        <div style={{ fontSize: '100px' }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
          <span>{seconds}</span>
        </div>
        <p>{isRunning ? runningMsg[0] : runningMsg[1]}</p>
        {isBtnStart && <button onClick={start}>{BtnStartTxt}</button>}
        {isBtnPause && <button onClick={pause}>{BtnPauseTxt}</button>}
        {isBtnReset && (
          <button
            onClick={() => {
              reset()
            }}>
            {BtnResetTxt}
          </button>
        )}
      </div>
    </>
  )
}
