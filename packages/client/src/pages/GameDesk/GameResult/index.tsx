import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Key } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoute } from '../../../utils/consts'

const styles = {
  backgroundMain: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  window: {
    width: '60%',
    height: '65%',
    display: 'flex',
    flexDirection: 'column',
    background: '#14100F',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid #2D2C2A',
  },

  cell: {
    padding: '1px',
    paddingLeft: '30px',
    fontSize: '0.75rem',
    border: 'none',
  },
  head: { padding: '4px', border: 'none' },
  row: { background: '#040404' },
  dataCell: {
    padding: '2px',
    fontSize: '0.75rem',
    border: 'none',
    textAlign: 'center',
  },
  textOverflow: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  rating: {
    width: '200px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btn: {
    alignSelf: 'center',
    marginBottom: '15px',
    padding: '10px 15px',
    fontSize: '0.88rem',
  },
}

type DataGameResult = Record<string, string | number>

const rows = {
  disposition: 'Диспозиция',
  headquarters: 'Штаб',
  deck_strength: 'Сила колоды',
  statistics: 'Статистика',
  strength_headquarters: 'Прочность штаба в момент окончания боя',
  cards_in_deck: 'Карт в колоде в момент окончания боя',
  resources_spent: 'Потрачено ресурсов за бой',
  vehicles_destroyed: 'Уничтожено техники противника',
  platoons_destroyed: 'Уничтожено взводов противника',
  orders_played: 'Разыграно приказов',
} as DataGameResult

const data1 = {
  disposition: 'Игорок 1',
  headquarters: '13-я дивизия',
  deck_strength: 3492,
  statistics: 'Игорок 1',
  strength_headquarters: 6,
  cards_in_deck: 27,
  resources_spent: 48,
  vehicles_destroyed: 8,
  platoons_destroyed: 0,
  orders_played: 1,
}

const data2 = {
  disposition: 'Игорок 2',
  headquarters: '2nd Armored',
  deck_strength: 316,
  statistics: 'Игорок 2',
  strength_headquarters: 0,
  cards_in_deck: 27,
  resources_spent: 40,
  vehicles_destroyed: 1,
  platoons_destroyed: 1,
  orders_played: 1,
}

export const GameResult = () => {
  const params = useParams()
  const navigate = useNavigate()

  console.log(`This is GameResult! Number ${params.gameId}`)

  const navigateToHeadquarters = () => {
    navigate(`/${AppRoute.Headquarters}`, { replace: true })
  }

  const dataCreator = (data1: DataGameResult, data2: DataGameResult) => {
    const rowsKeys = Object.keys(rows)
    return rowsKeys.map(key => [rows[key], data1[key], data2[key]])
  }

  const data = dataCreator(data1, data2)

  const formater = (i: (string | number)[], indx: Key) => (
    <TableRow key={indx}>
      <TableCell sx={{ ...styles.cell, ...styles.textOverflow }}>
        {i[0]}
      </TableCell>
      <TableCell sx={styles.dataCell}>{i[1]}</TableCell>
      <TableCell sx={styles.dataCell}>{i[2]}</TableCell>
    </TableRow>
  )

  return (
    <Container disableGutters>
      <Box sx={styles.backgroundMain}>
        <Box sx={styles.window}>
          <Box
            component="img"
            src="/victory.png"
            alt="victory"
            sx={{ width: '100%', maxHeight: '40%' }}
          />
          <Box sx={{ display: 'flex', flex: 1, padding: '20px' }}>
            <TableContainer sx={{ marginRight: '40px' }}>
              <Table>
                <TableBody>
                  <TableRow sx={styles.row}>
                    <TableCell sx={styles.head}>{data[0][0]}</TableCell>
                    <TableCell sx={styles.head} align="center">
                      {data[0][1]}
                    </TableCell>
                    <TableCell sx={styles.head} align="center">
                      {data[0][2]}
                    </TableCell>
                  </TableRow>

                  {data.slice(1, 3).map(formater)}

                  <TableRow sx={styles.row}>
                    <TableCell sx={styles.head}>{data[3][0]}</TableCell>
                    <TableCell sx={styles.head} align="center">
                      {data[3][1]}
                    </TableCell>
                    <TableCell sx={styles.head} align="center">
                      {data[3][2]}
                    </TableCell>
                  </TableRow>

                  {data.slice(4).map(formater)}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={styles.rating}>Рейтинг +0</Box>
          </Box>
          <Button
            onClick={navigateToHeadquarters}
            variant="sub"
            sx={styles.btn}>
            Продолжить
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
