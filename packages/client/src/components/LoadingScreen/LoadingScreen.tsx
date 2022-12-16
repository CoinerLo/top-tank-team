import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'

export const LoadingScreen: FC = () => {
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.5)',
      }}>
      <CircularProgress color="secondary" size={'450px'} />
    </Box>
  )
}
