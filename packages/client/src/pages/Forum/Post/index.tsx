import { Box, Container } from '@mui/material'
import { useParams } from 'react-router-dom'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: '100vh',
  overflowY: 'scroll',
}

export const PostPage = () => {
  const { id } = useParams()
  return (
    <Container disableGutters sx={containerStyles}>
      <Box width="100%" padding="30px">
        post - {id}
      </Box>
    </Container>
  )
}
