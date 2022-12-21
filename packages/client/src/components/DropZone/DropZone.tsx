import '@vizualabstract/react-dropzone-uploader/dist/styles.css'
import Dropzone, {
  IDropzoneProps,
  IPreviewProps,
} from '@vizualabstract/react-dropzone-uploader'
import { FC, useState } from 'react'
import { updateAvatarThunk } from '../../store/api-thunks'
import { useAppDispatch } from '../../hooks'
import { Box } from '@mui/material'

// Временное решение проблемы связанной с Vite https://github.com/vitejs/vite/issues/2139
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ReactDropzone = Dropzone.default ? Dropzone.default : Dropzone

const Preview: FC<IPreviewProps> = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta
  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #ddd',
        color: '#EAE3CC',
      }}>
      <Box
        component="img"
        src={previewUrl}
        sx={{
          margin: '10px',
          display: 'flex',
          alignContent: 'center',
          borderRadius: '5px',
          height: '150px',
        }}></Box>
      <Box>
        <Box component="span">{name}</Box> -{' '}
        <Box component="span">Загружено</Box>
        {status !== 'done' && (
          <Box component="span">&nbsp;({Math.round(percent)}%)</Box>
        )}
      </Box>
    </Box>
  )
}

export const DropZone = () => {
  const [isChanged, setISChanged] = useState(false)
  const dispatch = useAppDispatch()
  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = () => {
    setISChanged(!isChanged)
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    const body = new FormData()
    body.append('avatar', files[0].file)
    dispatch(updateAvatarThunk(body))
    allFiles.forEach(f => f.remove())
  }

  return (
    <ReactDropzone
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      onSubmit={handleSubmit}
      submitButtonContent="Загрузить"
      inputWithFilesContent="asd"
      styles={{
        submitButton: {
          background: '#545358',
        },
        inputLabel: {
          color: '#EAE3CC',
        },
        dropzone: {
          overflow: 'auto',
          border: '1px solid #999',
          background: '#706d6d',
        },
        inputLabelWithFiles: { margin: '20px' },
      }}
      canRemove={true}
      PreviewComponent={Preview}
      inputContent="Загрузите ваш аватар"
      accept="image/*,audio/*,video/*"
    />
  )
}
