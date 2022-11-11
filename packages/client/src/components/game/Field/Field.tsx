import Box from '@mui/material/Box/Box'
import { FC } from 'react'

interface IField {
  url: string
}

export const Field: FC<IField> = ({ url }) => {
  return (
    <Box
      sx={{
        width: '74px',
        height: '67px',
        mt: '5px',
        background: `url("${url}")`,
        backgroundSize: 'cover',
      }}
    />
  )
}
