import { Box, Button, Typography } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'
import { FC } from 'react'
import { humanizeDate } from '../../../utils/dataFormat'

interface PostCommentProps {
  id: number
  contextId: number
  parentId: number
  postAuthor: string
  postDate: string
  comment: string
  replyCb?: (commentId: number) => void
  comments?: Omit<PostCommentProps, 'replyCb'>[]
}

export const PostComment: FC<PostCommentProps> = ({
  id,
  comment,
  postDate,
  postAuthor,
  parentId,
  replyCb,
  comments,
}) => {
  const reply = parentId ? comments?.filter(el => el.id === parentId) : []
  const correctDate = new Date(postDate.replace(/"/g, ''))
  const humanizedDate = humanizeDate(correctDate)

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        padding: '15px',
        paddingRight: '30px',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 1px 0px rgb(0 0 0 / 10%)',
        borderRadius: '3px',
      }}>
      <Box paddingRight="15px" borderRight="1px solid #e0e0e0">
        <Typography>{postAuthor}</Typography>
      </Box>
      <Box marginLeft="15px">
        <Typography
          marginBottom="15px"
          paddingBottom="5px"
          borderBottom="1px solid #e0e0e0">
          Опубликован: {humanizedDate}
        </Typography>
        {parentId > 0 && reply?.length && (
          <Box
            sx={{
              border: '1px solid #ED6204',
              mb: '15px',
              p: '10px',
              borderRadius: '6px',
            }}>
            <Typography>
              В ответ на комменнтарий: {reply[0].comment.slice(0, 150) + '...'}
            </Typography>
          </Box>
        )}
        <Typography>{comment}</Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: '5px',
          top: '5px',
          width: '24px',
          height: '24px',
        }}>
        <Button
          onClick={() => {
            if (replyCb) {
              replyCb(id)
            }
          }}
          sx={{
            padding: 0,
            minWidth: 'auto',
            background: '#fff',
            opacity: '.6',
          }}>
          <ReplyIcon />
        </Button>
      </Box>
    </Box>
  )
}
