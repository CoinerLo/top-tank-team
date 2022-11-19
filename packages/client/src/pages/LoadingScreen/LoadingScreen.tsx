import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'

export const LoadingScreen: FC = () => {
  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center">
      <CircularProgress color="secondary" size={'450px'} />
    </Box>
  )
}
