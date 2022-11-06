import { Box, Button, Container, FormControl, TextField } from '@mui/material'
import { PostComment } from '../../../components/Forum/Comment'
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form'

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

  const onSubmit: SubmitHandler<ICommentData> = async data => {
    console.log(data)
  }

  const comments = [
    {
      id: 'sjf21',
      author: 'StalonoiVolk',
      postDate: 'August 29, 2018',
      comment: `Добрый день, уважаемые абитуриенты WGA!

        Вступление в ряды студентов Академии происходит на конкурсной основе. 
        
        1 этап: выполнение тестового задания. Вам необходимо выбрать направление, за которое Вы хотите быть ответственными в процессе разработки игры (во время учебного года роли могут меняться), и выполнить тестовое задание по нему. Готовое тестовое задание необходимо будет прислать на почту wga_spb@wargaming.net c темой письма "Тестовое задание для поступления". 
        
        2 этап: личная встреча с представителями Wargaming St Petersburg`,
      parentId: null,
    },
    {
      id: 'fqfe1',
      author: 'StalonoiVolk',
      postDate: 'August 29, 2018',
      comment: `Добрый день, уважаемые абитуриенты WGA!

        Вступление в ряды студентов Академии происходит на конкурсной основе. 
        
        1 этап: выполнение тестового задания. Вам необходимо выбрать направление, за которое Вы хотите быть ответственными в процессе разработки игры (во время учебного года роли могут меняться), и выполнить тестовое задание по нему. Готовое тестовое задание необходимо будет прислать на почту wga_spb@wargaming.net c темой письма "Тестовое задание для поступления". 
        
        2 этап: личная встреча с представителями Wargaming St Petersburg`,
      parentId: 'sjf21',
    },
  ]

  return (
    <Container disableGutters sx={containerStyles}>
      <Box width="90%" padding="30px">
        {/* post - {id} */}
        {comments.map(el => (
          <Box key={el.id} mb="10px">
            <PostComment
              {...el}
              replyCb={commentId => {
                console.log(commentId)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore --- временно, проп comments будет удален. Сейчас нужен для наглядности
              }}
              comments={comments}
            />
          </Box>
        ))}
        <FormControl
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
