import { Button, FormControl, TextField } from '@mui/material'
import {
  Controller,
  useFormState,
  useForm,
  SubmitHandler,
} from 'react-hook-form'
import { FC, useState } from 'react'
import { TabPanel } from '../../TabPanel/TabPanel'
import {
  emailValidation,
  firstNameValidation,
  loginValidation,
  phoneValidation,
  secondNameValidation,
} from '../../../utils/validation'
import { useAppDispatch, useAppselector } from '../../../hooks'
import { IChangeDataForm } from '../../../typings'
import { updateProfileThunk } from '../../../store/api-thunks'

interface IProfileTab {
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

export const ProfileTab: FC<IProfileTab> = ({ tabIndex, index }) => {
  const [isEditProfileMode, setIsEditProfileMode] = useState(false)
  const { currentUser } = useAppselector(({ USER }) => USER)
  const dispatch = useAppDispatch()
  const { first_name, second_name, display_name, login, email, phone } =
    currentUser
  const { handleSubmit, control } = useForm<IChangeDataForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      first_name: first_name,
      second_name: second_name,
      display_name: display_name,
      login: login,
      email: email,
      phone: phone,
    },
  })

  const { errors, isValid } = useFormState({
    control,
  })
  const handleSubmitProfileData: SubmitHandler<IChangeDataForm> = data => {
    dispatch(updateProfileThunk(data))
  }

  return (
    <TabPanel value={tabIndex} index={index}>
      <FormControl
        component="form"
        fullWidth
        onSubmit={handleSubmit(handleSubmitProfileData)}>
        <Controller
          control={control}
          name="first_name"
          rules={firstNameValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Имя"
              fullWidth={true}
              margin="normal"
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              value={field.value}
              disabled={!isEditProfileMode}
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              error={!!errors.first_name?.message}
              helperText={errors?.first_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="second_name"
          rules={secondNameValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Фамилия"
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              variant={!isEditProfileMode ? 'standard' : undefined}
              disabled={!isEditProfileMode}
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              error={!!errors.second_name?.message}
              helperText={errors?.second_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="display_name"
          rules={secondNameValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Игровое имя"
              value={field.value}
              fullWidth={true}
              size="small"
              margin="normal"
              variant={!isEditProfileMode ? 'standard' : undefined}
              disabled={!isEditProfileMode}
              onChange={e => field.onChange(e)}
              onBlur={() => field.onBlur()}
              error={!!errors.display_name?.message}
              helperText={errors?.display_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              sx={disabledFieldStyle}
              label="Логин"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
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
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
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
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
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
          disabled={!isValid && isEditProfileMode}
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
