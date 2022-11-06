import { Box } from '@mui/material'
import { FC } from 'react'

interface HeadquartersCardProps {
  name: string
}

export const HeadquartersCard: FC<HeadquartersCardProps> = ({ name }) => {
  return (
    <Box
      sx={{
        width: '135px',
        height: '180px',
        padding: '5px',
        background: '#14100F',
        textAlign: 'center',
      }}>
      {name}
    </Box>
  )
}
