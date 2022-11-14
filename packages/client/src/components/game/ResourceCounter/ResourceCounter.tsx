import { Box, Typography } from '@mui/material'
import { FC } from 'react'

interface IResourceСounter {
  futureСount: number
  currentCount: number
}

export const ResourceCounter: FC<IResourceСounter> = ({
  futureСount,
  currentCount,
}) => {
  return (
    <Box sx={{ position: 'relative', width: '75px', height: '53px' }}>
      <Box
        component="img"
        src="/cards/resources-counter.png"
        alt="resource counter"
      />
      <Typography
        sx={{
          position: 'absolute',
          top: 20,
          left: currentCount >= 10 ? 10 : 15,
          fontSize: '20px',
          color: '#C7A55A',
        }}>
        {currentCount}
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: 25,
          right: futureСount >= 10 ? 10 : 12,
          fontSize: '15px',
          fontWeight: 900,
          letterSpacing: '-3px',
          color: '#000',
        }}>
        {futureСount}
      </Typography>
    </Box>
  )
}
