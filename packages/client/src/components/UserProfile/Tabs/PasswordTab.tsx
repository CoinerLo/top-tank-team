import { Button, FormControl, TextField } from '@mui/material'
import {
  Controller,
  useFormState,
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { useState } from 'react'
import { TabPanel } from '../../TabPanel/TabPanel'
import { passwordValidation } from '../../../utils/validation'
import { RequiredField } from '../../../utils/consts'
import UserController from '../../../controllers/UserController'

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
  '& .Mui-disabled': {
    color: 'white',
    opacity: '.7',
  },
  '& .Mui-disabled:before': {
    borderColor: 'white',
  },
}

export const PasswordTab = ({ tabIndex, index }: IPasswordTab) => {
  const [isEditPasswordMode, setIsEditPasswordMode] = useState(false)
  const { handleSubmit, control, getValues } = useForm<IChangePasswordForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors, isValid } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<IChangePasswordForm> = async data => {
    const noRepeat = ({ repeatPassword, ...rest }: IChangePasswordForm) => rest
    const dataSend = noRepeat(data)
    const res = await UserController.updatePassword(dataSend)
    if (res?.status == 200) {
      alert('Пароль успешно изменен')
    }
  }

  return (
    <TabPanel value={tabIndex} index={index}>
      <FormControl component="form" fullWidth onSubmit={handleSubmit(onSubmit)}>
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
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
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
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
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
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
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
    </TabPanel>
  )
}
