import {
  Button,
  FormControl,
  IconButton,
  Snackbar,
  TextField,
} from '@mui/material'
import {
  Controller,
  useFormState,
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { FC, useState } from 'react'
import { TabPanel } from '../../TabPanel/TabPanel'
import { passwordValidation } from '../../../utils/validation'
import { RequiredField } from '../../../utils/consts'
import UserController from '../../../controllers/UserController'
import CloseIcon from '@mui/icons-material/Close'

export interface IChangePasswordForm {
  newPassword: string
  repeatPassword: string
  oldPassword: string
}
interface IPasswordTab {
  tabIndex: number
  index: number
}

const disabledFieldStyle = {
  '& label.Mui-disabled': {
    color: 'white',
    opacity: '.7',
  },
  '& input.Mui-disabled': {
    color: 'white',
    opacity: '.7',
    WebkitTextFillColor: 'white',
  },
  '& .Mui-disabled:before': {
    borderColor: 'white',
  },
}

export const PasswordTab: FC<IPasswordTab> = ({ tabIndex, index }) => {
  const [isEditPasswordMode, setIsEditPasswordMode] = useState(false)
  const [isOpenMsg, setIsOpenMsg] = useState(false)
  const [message, setMessage] = useState('')
  const { handleSubmit, control, getValues, reset } =
    useForm<IChangePasswordForm>({
      mode: 'onBlur',
      reValidateMode: 'onChange',
    })
  const { errors, isValid } = useFormState({
    control,
  })
  const handleSubmitPasswordData: SubmitHandler<
    IChangePasswordForm
  > = async data => {
    const checkNoRepeat = ({
      newPassword,
      oldPassword,
    }: IChangePasswordForm) => ({ newPassword, oldPassword })
    const dataSend = checkNoRepeat(data)
    const res = await UserController.updatePassword(dataSend)
    if (res) {
      setMessage('Пароль успешно изменен')
      setIsOpenMsg(res)
    } else {
      setMessage('Ошибка, пароль не изменен')
      setIsOpenMsg(!res)
    }
    reset({
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    })
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setIsOpenMsg(false)
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <TabPanel value={tabIndex} index={index}>
      <FormControl
        component="form"
        fullWidth
        onSubmit={handleSubmit(handleSubmitPasswordData)}>
        <Controller
          control={control}
          name="oldPassword"
          rules={{
            required: RequiredField.Default,
          }}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Старый пароль"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditPasswordMode ? 'standard' : undefined}
              margin="normal"
              type="password"
              disabled={!isEditPasswordMode}
              error={!!errors.oldPassword?.message}
              helperText={errors?.oldPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Новый пароль"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditPasswordMode ? 'standard' : undefined}
              margin="normal"
              type="password"
              disabled={!isEditPasswordMode}
              error={!!errors.newPassword?.message}
              helperText={errors?.newPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="repeatPassword"
          rules={{
            validate: () => {
              if (getValues('newPassword') !== getValues('repeatPassword')) {
                return RequiredField.EqualPassword
              }
            },
          }}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Повторите пароль"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditPasswordMode ? 'standard' : undefined}
              margin="normal"
              type="password"
              error={!!errors.repeatPassword?.message}
              helperText={errors?.repeatPassword?.message}
              disabled={!isEditPasswordMode}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          disableElevation
          disabled={!isValid && isEditPasswordMode}
          onClick={e => {
            if (isEditPasswordMode) {
              setIsEditPasswordMode(!isEditPasswordMode)
            } else {
              e.preventDefault()
              setIsEditPasswordMode(!isEditPasswordMode)
            }
          }}
          sx={{
            margin: '0 auto',
            marginTop: 2,
          }}>
          {!isEditPasswordMode ? 'Редактировать пароль' : 'Сохранить'}
        </Button>
      </FormControl>
      <Snackbar
        open={isOpenMsg}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </TabPanel>
  )
}
