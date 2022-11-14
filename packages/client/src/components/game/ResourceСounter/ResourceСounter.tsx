import { Box, Typography } from '@mui/material'
import { FC } from 'react'

interface IResourceСounter {
  futureСount: number
  nowCount: number
}

export const ResourceСounter: FC<IResourceСounter> = ({
  futureСount,
  nowCount,
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
          left: nowCount >= 10 ? 10 : 15,
          fontSize: '20px',
          color: '#C7A55A',
        }}>
        {nowCount}
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
