import { Container, Box, Typography } from '@mui/material'
import { BasicTable } from '../../components/ui/table/index'

export const LeaderBoard = () => {
  return (
    <Container disableGutters>
      <Box mt={8} mb={2}>
        <Box mb={1} ml={2}>
          <Typography variant="h5" fontWeight="medium">
            Leaderboard
          </Typography>
        </Box>
        <BasicTable />
      </Box>
    </Container>
  )
}
