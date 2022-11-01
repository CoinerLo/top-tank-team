import { Box, Button, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { useState } from 'react'
import { TabPanel } from '../../TabPanel/TabPanel'

interface IProfileTab {
  tabIndex: number
  index: number
  control: Control
}

export const ProfileTab = ({ tabIndex, index, control }: IProfileTab) => {
  const [isEditProfileMode, setIsEditProfileMode] = useState(false)

  return (
    <TabPanel value={tabIndex} index={index}>
      <form>
        <Controller
          control={control}
          name="login"
          render={({ field }) => (
            <TextField
              label="Логин"
              onChange={e => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              margin="normal"
              disabled={!isEditProfileMode}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              label="Почта"
              onChange={e => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              margin="normal"
              disabled={!isEditProfileMode}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <TextField
              label="Телефон"
              onChange={e => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              variant={!isEditProfileMode ? 'standard' : undefined}
              margin="normal"
              disabled={!isEditProfileMode}
            />
          )}
        />
        <Button
          variant="contained"
          fullWidth
          disableElevation
          onClick={() => setIsEditProfileMode(!isEditProfileMode)}
          sx={{
            marginTop: 2,
          }}>
          {!isEditProfileMode
            ? 'Редактировать профиль'
            : 'Прекратить редактирование'}
        </Button>
      </form>
      <Box></Box>
    </TabPanel>
  )
}
