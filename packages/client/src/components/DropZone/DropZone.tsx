import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'
import { useState } from 'react'
import { updateAvatarThunk } from '../../store/api-thunks'
import { useAppDispatch } from '../../hooks'

const Preview = ({ meta }: { meta: any }) => {
  const { name, percent, status, previewUrl } = meta
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        padding: '20px 3%',
        borderBottom: '1px solid #ddd',
        color: '#EAE3CC',
      }}>
      <img
        src={previewUrl}
        height={150}
        style={{
          margin: '10px',
          display: 'flex',
          alignContent: 'center',
          borderRadius: '5px',
        }}
      />
      <div>
        <span className="name">{name}</span> -{' '}
        <span className="status">Загружено</span>
        {status !== 'done' && (
          <span className="percent">&nbsp;({Math.round(percent)}%)</span>
        )}
      </div>
    </div>
  )
}

export const DropZone = () => {
  const [isChanged, setISChanged] = useState(false)
  const dispatch = useAppDispatch()
  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta, file },
    status
  ) => {
    console.log(status, meta, file)
    setISChanged(!isChanged)
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    const body = new FormData()
    body.append('avatar', files[0].file)
    dispatch(updateAvatarThunk(body))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
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
        inputLabelWithFiles: { margin: '20px 3%' },
      }}
      canRemove={true}
      PreviewComponent={Preview}
      inputContent="Загрузите ваш аватар"
      accept="image/*,audio/*,video/*"
    />
  )
}
