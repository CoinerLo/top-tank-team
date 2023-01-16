import { Box, Link, Typography } from '@mui/material'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface ForumThemeProps {
  id: number
  title: string
  repliesCount: number
  authorName: string
  lastReplied: string
  lastRepliedDate: string
  dateTopic: string
}

export const ForumPost: FC<ForumThemeProps> = ({
  title,
  repliesCount,
  authorName,
  lastReplied,
  lastRepliedDate,
  dateTopic,
  id,
}) => {
  return (
    <Box display="flex" borderBottom="1px solid grey" padding="10px">
      <Box display="flex" flexDirection="column" width="100%">
        <Link
          component={NavLink}
          to={id.toString()}
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
