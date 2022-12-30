import { Container, Box, Typography } from '@mui/material'
import { FC } from 'react'
import { BasicTable } from '../../components/leaderboard/table/BasicTable'

export const Leaderboard: FC = () => {
  return (
    <Container
      disableGutters
      sx={{
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
        overflowY: 'scroll',
      }}>
      <Box sx={{ width: '80%', height: '70%', marginTop: '20px' }}>
        <Box mb={1} ml={2}>
          <Typography variant="h5" fontWeight="medium">
            Лучшие из лучших
          </Typography>
        </Box>
        <BasicTable />
      </Box>
    </Container>
  )
}
