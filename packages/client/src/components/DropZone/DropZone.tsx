import 'react-dropzone-uploader/dist/styles.css'
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'
import { useState } from 'react'

export const DropZone = () => {
  const [wasChanged, setWasChanged] = useState(false)
  const getUploadParams: IDropzoneProps['getUploadParams'] = ({ meta }) => {
    console.log(meta)
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
