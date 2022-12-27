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
import { RatingCell, RatingCellProps } from './cell/rating/RatingCell'

function createData(
  name: string,
  games: number,
  wins: number,
  rating: RatingCellProps['rating']
) {
  return { name, games, wins, rating }
}

// const rows = [
//   createData('Водитель трактора', 159, 78, 4.5),
//   createData('Механик x-zibit', 237, 110, 4.5),
//   createData('Длинный ствол', 262, 140, 5),
//   createData('Илон Маск', 305, 200, 5),
//   createData('Везучий', 150, 10, 1),
// ]

export function BasicTable() {
  const { leaders } = useAppselector(({ USER }) => USER)
  let arr:any[] = []
  if (leaders) {
    arr = leaders.filter((val:any) => {
      if (val.data.name == 'gamer7') {
        return true
      }
      return false
    })
  }
  console.log(leaders, arr)
  let rows:any[] = []
  if (leaders) {
    leaders.map((val:any) => {
      rows.push(createData(val.data.name,1,val.data.ratingTopTank1,1))
    })

  }
  // const rows = [
  //   createData('Водитель трактора', 159, 78, 4.5),
  //   createData('Механик x-zibit', 237, 110, 4.5),
  //   createData('Длинный ствол', 262, 140, 5),
  //   createData('Илон Маск', 305, 200, 5),
  //   createData('Везучий', 150, 10, 1),
  // ]
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: '#373936' }}
        aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Игрок</TableCell>
            <TableCell align="right">Кол-во игр</TableCell>
            <TableCell align="right">Кол-во побед</TableCell>
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
              <TableCell align="right">{row.games}</TableCell>
              <TableCell align="right">{row.wins}</TableCell>
              <RatingCell rating={row.rating}></RatingCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
