import { Box, Link, Typography } from '@mui/material'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import {format} from 'date-fns'
import ru from 'date-fns/locale/ru'


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
  id,
}) => {
  const correctDate = new Date(lastRepliedDate.replace(/"/g, ''))
  
  // Временно оставлю так, чуть позже добавлю либу dateFns для нормального отображения дат.
  const humanizedDate = format(new Date(correctDate), 'dd LLL - HH:mm', {
    locale: ru
  })
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
        <Typography>{humanizedDate}</Typography>
      </Box>
    </Box>
  )
}
