import { Box, Container, Typography } from '@mui/material'
import { ForumPost } from '../../components/Forum/Post/ForumPost'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: '100vh',
  overflowY: 'scroll',
}

const ForumPosts = [
  {
    id: 'sa;lfkj',
    title: 'test',
    repliesCount: 0,
    authorName: 'VasyaUbivator',
    lastReplied: 'StalnoiVolk',
    lastRepliedDate: '10.01.2022',
  },
  {
    id: 'sa;lfkfafsasj',
    title: 'test',
    repliesCount: 0,
    authorName: 'VasyaUbivator',
    lastReplied: 'StalnoiVolk',
    lastRepliedDate: '10.01.2022',
  },
  {
    id: 'sa;asffaq124',
    title: 'test',
    repliesCount: 0,
    authorName: 'VasyaUbivator',
    lastReplied: 'StalnoiVolk',
    lastRepliedDate: '10.01.2022',
  },
]

export const Forum = () => {
  return (
    <Container disableGutters sx={containerStyles}>
      <Typography variant="h1" margin="10px auto">
        Форум
      </Typography>
      <Box width="70%" padding="30px">
        {ForumPosts.map(el => {
          return (
            <Box key={el.id} marginBottom="15px">
              <ForumPost {...el} />
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}
