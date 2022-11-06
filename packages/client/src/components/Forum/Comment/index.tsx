import { Box, Button, Typography } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'

interface PostCommentProps {
  id: string
  comment: string
  postDate: string
  author: string
  parentId: string | null
  replyCb: (commentId: string) => void
  comments?: PostCommentProps[] // - временно, после добавления апи, будем получать не массив, а отдельно комментарий по parentId для размещения в блоке reply
}

export const PostComment = ({
  id,
  comment,
  postDate,
  author,
  parentId,
  replyCb,
  comments,
}: PostCommentProps) => {
  const reply = parentId ? comments?.filter(el => el.id === parentId) : []

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
        <Typography>{author}</Typography>
      </Box>
      <Box marginLeft="15px">
        <Typography
          marginBottom="15px"
          paddingBottom="5px"
          borderBottom="1px solid #e0e0e0">
          Опубликован: {postDate}
        </Typography>
        {parentId && reply?.length && (
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
            replyCb(id)
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
