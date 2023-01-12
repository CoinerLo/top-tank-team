import { FC } from 'react'
import { Typography, Box } from '@mui/material'
import { StarRate, StarHalf, StarOutline } from '@mui/icons-material'
import { RatingCellProps } from '../../../../../typings'

export const RatingCell: FC<RatingCellProps> = ({ rating }) => {
  const ratings = {
    0: [
      <StarOutline key={1}>no_star</StarOutline>,
      <StarOutline key={2}>no_star</StarOutline>,
      <StarOutline key={3}>no_star</StarOutline>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    0.5: [
      <StarHalf key={1}>star_half</StarHalf>,
      <StarOutline key={2}>no_star</StarOutline>,
      <StarOutline key={3}>no_star</StarOutline>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    1: [
      <StarRate key={1}>star</StarRate>,
      <StarOutline key={2}>no_star</StarOutline>,
      <StarOutline key={3}>no_star</StarOutline>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    1.5: [
      <StarRate key={1}>star</StarRate>,
      <StarHalf key={2}>star_half</StarHalf>,
      <StarOutline key={3}>no_star</StarOutline>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    2: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarOutline key={3}>no_star</StarOutline>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    2.5: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarHalf key={3}>star_half</StarHalf>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    3: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarRate key={3}>star</StarRate>,
      <StarOutline key={4}>no_star</StarOutline>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    3.5: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarRate key={3}>star</StarRate>,
      <StarHalf key={4}>star_half</StarHalf>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    4: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarRate key={3}>star</StarRate>,
      <StarRate key={4}>star</StarRate>,
      <StarOutline key={5}>no_star</StarOutline>,
    ],
    4.5: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarRate key={3}>star</StarRate>,
      <StarRate key={4}>star</StarRate>,
      <StarHalf key={5}>star_half</StarHalf>,
    ],
    5: [
      <StarRate key={1}>star</StarRate>,
      <StarRate key={2}>star</StarRate>,
      <StarRate key={3}>star</StarRate>,
      <StarRate key={4}>star</StarRate>,
      <StarRate key={5}>star</StarRate>,
    ],
  }

  return (
    <Box component="td">
      <Typography variant="h4" color="text" align="center">
        {ratings[rating]}
      </Typography>
    </Box>
  )
}
