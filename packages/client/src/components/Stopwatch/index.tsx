import { FC } from 'react'
import { useStopwatch } from 'react-timer-hook'

interface MyStopwatchProps {
  title: string
  subTitle: string
}

export const MyStopwatch: FC<MyStopwatchProps> = ({ title, subTitle }) => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true })

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>{title}</h1>
        <p>{subTitle}</p>
        <div style={{ fontSize: '100px' }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
          <span>{seconds}</span>
        </div>
        <p>{isRunning ? 'Идет поиск' : 'Поиск прерван'}</p>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button
          onClick={() => {
            reset()
          }}>
          Reset
        </button>
      </div>
    </>
  )
}
