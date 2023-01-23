import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useParams } from 'react-router-dom'
import { PostComment } from '../../../components/Forum/Comment/PostComment'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { AppRoute } from '../../../utils/consts'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppselector } from '../../../hooks'
import {
  addCommentInDBThunk,
  commentsByTopicInDBThunk,
} from '../../../store/api-thunks'
import { IComment } from '../../../typings'

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
  const { login: authorName } = useAppselector(({ USER }) => USER.currentUser)
  const [parentId, setParentId] = useState(0)
  const { postId } = useParams()

  const id = postId ? +postId : 0

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
    const { comment } = data
    await dispatch(addCommentInDBThunk({ id, comment, parentId, authorName }))
    setParentId(0)
    dispatch(commentsByTopicInDBThunk(+id))
    reset()
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
        {forum.comments.map(
          ({
            comment,
            contextId,
            id,
            parentId,
            postAuthor,
            postDate,
          }: IComment) => (
            <Box key={id} mb="10px">
              <PostComment
                id={id}
                comment={comment}
                contextId={contextId}
                parentId={parentId}
                postAuthor={postAuthor}
                postDate={postDate}
                replyCb={setParentId}
                comments={forum.comments}
              />
            </Box>
          )
        )}
        {parentId > 0 && (
          <Box
            display="flex"
            mb="-20px"
            border="1px solid #fff"
            borderBottom={0}
            width="max-content"
            ml="10px">
            <Typography>
              {`Ответ на комментарий: <<${forum.comments
                .find(el => el.id === parentId)
                ?.comment.slice(0, 15)}>>`}
            </Typography>
            <Button
              sx={{
                background: 'transparent',
                height: '20px',
              }}
              size="small"
              variant="sub"
              onClick={() => {
                setParentId(0)
              }}>
              <CloseIcon fontSize="small" />
            </Button>
          </Box>
        )}
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
                onChange={e => {
                  field.onChange(e)
                  if (parentId && field.value && field.value.length === 0) {
                    setParentId(0)
                  }
                }}
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
