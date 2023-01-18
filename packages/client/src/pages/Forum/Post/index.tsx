import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
} from '@mui/material'
import { PostComment } from '../../../components/Forum/Comment/PostComment'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { comments } from './mockData'
import { AppRoute } from '../../../utils/consts'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppselector } from '../../../hooks'
import {
  addCommentInDBThunk,
  commentsByTopicInDBThunk,
} from '../../../store/api-thunks'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: '100vh',
  overflowY: 'scroll',
}

interface ICommentData {
  comment: string
}

export const PostPage = () => {
  const dispatch = useAppDispatch()

  const forum = useAppselector(({ FORUM }) => FORUM)
  const { currentUser } = useAppselector(({ USER }) => USER)
  const { login } = currentUser
  const authorName = login

  // ВНИМАНИЕ требует исправления
  // достать из useHistory URL номер страницы topic
  const id = 1
  // получать номер комментария родителя если комментарий комментария
  const parentId = 0

  useEffect(() => {
    dispatch(commentsByTopicInDBThunk(id))
  }, [])

  const { handleSubmit, control, reset } = useForm<ICommentData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors } = useFormState({
    control,
  })

  const handleSubmitCommentData: SubmitHandler<ICommentData> = async data => {
    console.log(data)
    const { comment } = data
    const successCb = () => {
      dispatch(commentsByTopicInDBThunk(id))
      reset()
    }
    dispatch(
      addCommentInDBThunk({ id, comment, parentId, authorName, successCb })
    )
  }

  return (
    <Container disableGutters sx={containerStyles}>
      <Link
        component={NavLink}
        to={`/${AppRoute.Forum}`}
        width="max-content"
        sx={{
          color: '#ED6204',
          marginTop: '15px',
          marginBottom: '15px',
        }}>
        К списку постов
      </Link>
      <Box width="90%" padding="30px" paddingTop={0}>
        {comments.map(el => (
          <Box key={el.id} mb="10px">
            <PostComment
              {...el}
              replyCb={commentId => {
                console.log(commentId)
              }}
              comments={comments}
            />
          </Box>
        ))}
        {forum.comment.map(el => (
          <Box key={el.id} mb="10px">
            <PostComment
              {...el}
              replyCb={commentId => {
                console.log(commentId)
              }}
              comments={comments}
            />
          </Box>
        ))}
        <FormControl
          component="form"
          onSubmit={handleSubmit(handleSubmitCommentData)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '20px',
          }}>
          <Controller
            control={control}
            name="comment"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                label="Комменнтарий"
                onChange={e => field.onChange(e)}
                onBlur={() => field.onBlur()}
                value={field.value || ''}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fff',
                  },
                  margin: 0,
                }}
                fullWidth={true}
                size="small"
                margin="normal"
                type="text"
                error={!!errors?.comment?.message}
                helperText={errors?.comment?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="sub"
            disableElevation
            sx={{
              height: '40px',
              marginLeft: '10px',
            }}>
            Send
          </Button>
        </FormControl>
      </Box>
    </Container>
  )
}
