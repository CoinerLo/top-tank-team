import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

interface CardUpgradeProps {
  name: string
}

export const CardUpgrade: FC<CardUpgradeProps> = ({ name }) => {
  return (
    <Box
      sx={{
        width: '120px',
        height: '120px',
        background: '#262626',
        textAlign: 'center',
      }}>
      <Typography>{name}</Typography>
    </Box>
  )
}
