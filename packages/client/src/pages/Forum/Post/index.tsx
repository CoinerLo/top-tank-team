import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
} from '@mui/material'
import { PostComment } from '../../../components/Forum/Comment'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { comments } from './mockData'
import { AppRoute } from '../../../utils/consts'
import { NavLink } from 'react-router-dom'

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
  const { handleSubmit, control } = useForm<ICommentData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors } = useFormState({
    control,
  })

  const handleSubmitCommentData: SubmitHandler<ICommentData> = async data => {
    console.log(data)
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
