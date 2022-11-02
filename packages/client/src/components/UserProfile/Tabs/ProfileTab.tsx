import { Button, FormControl, TextField } from '@mui/material'
import {
  Controller,
  useFormState,
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { useState } from 'react'
import { TabPanel } from '../../TabPanel/TabPanel'
import {
  emailValidation,
  loginValidation,
  passwordValidation,
  phoneValidation,
} from '../../../utils/validation'
import { RequiredField } from '../../../utils/consts'

interface IChangeDataForm {
  login: string
  email: string
  phone: string
}
interface IProfileTab {
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

export const ProfileTab = ({ tabIndex, index }: IProfileTab) => {
  const [isEditProfileMode, setIsEditProfileMode] = useState(false)
  const { handleSubmit, control } = useForm<IChangeDataForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const { errors, isValid } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<IChangeDataForm> = data => {
    console.log(data)
  }

  return (
    <TabPanel value={tabIndex} index={index}>
      <FormControl component="form" fullWidth onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Логин"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              margin="normal"
              disabled={!isEditProfileMode}
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={emailValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Почта"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              margin="normal"
              disabled={!isEditProfileMode}
              error={!!errors.email?.message}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          rules={phoneValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Телефон"
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              margin="normal"
              disabled={!isEditProfileMode}
              error={!!errors.phone?.message}
              helperText={errors?.phone?.message}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          disableElevation
          onClick={e => {
            if (isEditProfileMode) {
              setIsEditProfileMode(!isEditProfileMode)
            } else {
              e.preventDefault()
              setIsEditProfileMode(!isEditProfileMode)
            }
          }}
          sx={{
            margin: '0 auto',
            marginTop: 2,
          }}>
          {!isEditProfileMode ? 'Редактировать профиль' : 'Сохранить'}
        </Button>
      </FormControl>
    </TabPanel>
  )
}
