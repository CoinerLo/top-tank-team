import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'

export type ITabPanelProps = {
  index: number
  value: number
  children: ReactNode
}

export const TabPanel: FC<ITabPanelProps> = ({ index, value, children }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}>
      {value === index && <>{children}</>}
    </Box>
  )
}
