import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { useAppselector } from '../../../hooks'
import { ICreateData, ILeader, RatingCellProps } from '../../../typings'
import { RatingCell } from './cell/rating/RatingCell'

function createData(name: string, rating: RatingCellProps['rating']) {
  return { name, rating }
}

export function BasicTable() {
  const rows: Array<ICreateData> = useAppselector(({ LEADERS }) =>
    LEADERS.leaders.map(({ data }: ILeader) => {
      return createData(
        data.name,
        data.ratingTopTank1 as RatingCellProps['rating']
      )
    })
  )

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: '#373936' }}
        aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Игрок</TableCell>
            <TableCell align="right">Кол-во очков</TableCell>
            <TableCell align="center">Рейтинг</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.rating * 20}</TableCell>
              <RatingCell
                rating={Math.round(row.rating) as RatingCellProps['rating']}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
