import { Box, Button, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { useState } from 'react'
import { TabPanel } from '../../TabPanel/TabPanel'

interface IPasswordTab {
  tabIndex: number
  index: number
  control: Control
}

export const PasswordTab = ({ tabIndex, index, control }: IPasswordTab) => {
  const [isEditPasswordMode, setIsEditPasswordMode] = useState(false)

  return (
    <TabPanel value={tabIndex} index={index}>
      <form>
        <Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <TextField
              label="Старый пароль"
              onChange={e => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditPasswordMode ? 'standard' : undefined}
              margin="normal"
              type="password"
              disabled={!isEditPasswordMode}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <TextField
              label="Новый пароль"
              onChange={e => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditPasswordMode ? 'standard' : undefined}
              margin="normal"
              type="password"
              disabled={!isEditPasswordMode}
            />
          )}
        />
        <Controller
          control={control}
          name="repeatPassword"
          render={({ field }) => (
            <TextField
              label="Повторите пароль"
              onChange={e => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditPasswordMode ? 'standard' : undefined}
              margin="normal"
              type="password"
              disabled={!isEditPasswordMode}
            />
          )}
        />
        <Button
          variant="contained"
          fullWidth
          disableElevation
          onClick={() => setIsEditPasswordMode(!isEditPasswordMode)}
          sx={{
            marginTop: 2,
          }}>
          {!isEditPasswordMode
            ? 'Редактировать пароль'
            : 'Прекратить редактирование'}
        </Button>
      </form>
      <Box></Box>
    </TabPanel>
  )
}
