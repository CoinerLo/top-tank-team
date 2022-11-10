import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'
import { useState } from 'react'
import UserController from '../../controllers/UserController'

export const DropZone = () => {
  const [isChanged, setISChanged] = useState(false)

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
    UserController.updateAvatar(body)
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  )
}
