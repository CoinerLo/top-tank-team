import Avatar from '@mui/material/Avatar'
import { Box, Modal, SxProps, Tab, Tabs, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { PasswordTab } from './Tabs/PasswordTab'
import { ProfileTab } from './Tabs/ProfileTab'
import { DropZone } from '../DropZone/DropZone'

interface IUserAvatar {
  avatar?: string
  containerStyle?: SxProps
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const UserProfile = ({ avatar, containerStyle }: IUserAvatar) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false)
  const { control } = useForm()

  const [tabIndex, setTabIndex] = useState(0)

  const handleChangeTab = (event: React.SyntheticEvent, value: number) => {
    setTabIndex(value)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '15px',
          boxShadow: 3,
          borderRadius: '6px',
          alignItems: 'center',
          border: '1px solid #fff',
          background: 'rgba(22, 56, 5, 0.8)',
          ...containerStyle,
        }}>
        <Avatar
          onClick={() => setIsOpen(true)}
          src={avatar}
          sx={{
            cursor: 'pointer',
          }}
        />
        <Box>
          <Typography marginLeft="10px">
            Константин Константинопольский
          </Typography>
        </Box>
      </Box>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={modalStyle}>
          <Typography alignSelf="center" marginBottom="20px" variant="h2">
            Профиль
          </Typography>
          <Avatar
            onClick={() => setIsChangeAvatarOpen(true)}
            src={avatar}
            sx={{
              cursor: 'pointer',
              alignSelf: 'center',
              marginBottom: '10px',
            }}
          />
          <Tabs variant="fullWidth" value={tabIndex} onChange={handleChangeTab}>
            <Tab label="Профиль" />
            <Tab label="Пароль" />
          </Tabs>
          <ProfileTab tabIndex={tabIndex} index={0} control={control} />
          <PasswordTab tabIndex={tabIndex} index={1} control={control} />
          <Modal
            open={isChangeAvatarOpen}
            onClose={() => setIsChangeAvatarOpen(false)}>
            <Box
              sx={{
                ...modalStyle,
                minHeight: '500px',
              }}>
              <Typography alignSelf="center" marginBottom="20px" variant="h3">
                Изменение аватара
              </Typography>
              <DropZone />
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  )
}
