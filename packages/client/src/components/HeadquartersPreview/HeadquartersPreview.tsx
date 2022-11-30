import Box from '@mui/material/Box/Box'
import { FC } from 'react'

interface IHeadquartersPreview {
  url: string
}

export const HeadquartersPreview: FC<IHeadquartersPreview> = ({ url }) => {
  return (
    <Box
      sx={{
        height: '250px',
        width: '450px',
        margin: 'auto',
        mt: '10px',
        background: `url(${url})`,
        backgroundSize: 'cover',
        borderRadius: '35px',
        boxShadow: '0 0 10px 10px #444 inset',
        transitionDuration: '1s',
      }}
    />
  )
}
