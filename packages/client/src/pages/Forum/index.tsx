import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'
import { ForumPost } from '../../components/Forum/Post/ForumPost'
import { useAppDispatch, useAppselector } from '../../hooks'
import { addPostInDBThunk, findAlltopicInDBThunk } from '../../store/api-thunks'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: '100vh',
  overflowY: 'scroll',
}
interface IPostData {
  topic: string
  comment: string
}

export const Forum = () => {
  const forum = useAppselector(({ FORUM }) => FORUM)
  const { currentUser } = useAppselector(({ USER }) => USER)
  const { login } = currentUser
  const authorName = login

  const dispatch = useAppDispatch()

  const { handleSubmit, control, reset } = useForm<IPostData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors } = useFormState({
    control,
  })

  const handleSubmitCommentData: SubmitHandler<IPostData> = async data => {
    console.log(data)
    const { topic, comment } = data
    await dispatch(addPostInDBThunk({ topic, comment, authorName }))
    dispatch(findAlltopicInDBThunk())
    reset()
  }

  return (
    <Container disableGutters sx={containerStyles}>
      <Typography variant="h1" margin="10px auto">
        Форум
      </Typography>
      <Box width="70%" padding="30px">
        {forum.topic.map(el => {
          return (
            <Box key={el.id} marginBottom="15px">
              <ForumPost {...el} />
            </Box>
          )
        })}
      </Box>
      <Box>
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
            name="topic"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                label="Тема"
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
                error={!!errors?.topic?.message}
                helperText={errors?.topic?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="comment"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                label="Текст сообщения"
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
