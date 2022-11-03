import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'
import { useState } from 'react'
import UserController from '../../controllers/UserController'

export const DropZone = () => {
  const [wasChanged, setWasChanged] = useState(false)
  const getUploadParams: IDropzoneProps['getUploadParams'] = ({
    file,
    meta,
  }) => {
    console.log(meta)
    // const body = new FormData()
    // body.append('avatar', file)
    // console.log(body)
    // UserController.updateAvatar(body)
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta, file },
    status
  ) => {
    console.log(status, meta, file)
    setWasChanged(!wasChanged)
  }

  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    console.log('fieles', files)
    const body = new FormData()
    body.append('avatar', files[0].file)
    console.log(body)
    UserController.updateAvatar(body)
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  )
}
