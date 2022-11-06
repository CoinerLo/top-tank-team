import { Box, Link, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface ForumThemeProps {
  id: string
  title: string
  repliesCount: number
  authorName: string
  lastReplied: string
  lastRepliedDate: string
}

export const ForumPost = ({
  title,
  repliesCount,
  authorName,
  lastReplied,
  lastRepliedDate,
  id,
}: ForumThemeProps) => {
  return (
    <Box display="flex" borderBottom="1px solid grey" padding="10px">
      <Box display="flex" flexDirection="column" width="100%">
        <Link
          component={NavLink}
          to={id}
          marginBottom="5px"
          width="max-content"
          sx={{
            color: '#ED6204',
          }}>
          {title}
        </Link>
        <Typography>Автор: {authorName}</Typography>
      </Box>
      <Box
        sx={{
          width: '150px',
          px: '10px',
          marginLeft: '10px',
          flexShrink: 0,
          borderLeft: '1px solid grey',
        }}>
        <Typography>{repliesCount} ответов</Typography>
      </Box>
      <Box
        sx={{
          width: '200px',
          px: '10px',
          marginLeft: '10px',
          flexShrink: 0,
          borderLeft: '1px solid grey',
        }}>
        <Typography>{lastReplied}</Typography>
        <Typography>{lastRepliedDate}</Typography>
      </Box>
    </Box>
  )
}
