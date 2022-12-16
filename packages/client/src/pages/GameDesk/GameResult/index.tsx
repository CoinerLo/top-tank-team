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
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Game } from '../../../gameCore/models/Game'
import { KeyDataGameResultType } from '../../../typings'
import { resultGameDataCreator } from '../../../utils'
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

interface IGameResultDesk {
  game: Game
}

export const GameResult: FC<IGameResultDesk> = ({ game }) => {
  const navigate = useNavigate()

  const navigateToHeadquarters = () => {
    navigate(`/${AppRoute.Headquarters}`, { replace: true })
  }

  const {
    headquarters,
    deckStrength,
    headquartersHealth,
    cardsInDeck,
    resourcesSpent,
    vehiclesDestroyed,
    platoonsDestroyed,
    ordersPlayed,
    disposition,
    statistics,
  } = resultGameDataCreator(game)

  const TableRowFormater = (
    ...args: KeyDataGameResultType<string | number>[]
  ) =>
    args.map(({ title, user, opponent }) => (
      <TableRow key={title}>
        <TableCell sx={{ ...styles.cell, ...styles.textOverflow }}>
          {title}
        </TableCell>
        <TableCell sx={styles.dataCell}>{user}</TableCell>
        <TableCell sx={styles.dataCell}>{opponent}</TableCell>
      </TableRow>
    ))

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
          <Box sx={{ alignSelf: 'center', mt: '20px' }}>
            {`Победил ${game.getWinnerName()}! ${game.endTheGameMessage}`}
          </Box>
          <Box sx={{ display: 'flex', flex: 1, padding: '20px' }}>
            <TableContainer sx={{ marginRight: '40px' }}>
              <Table>
                <TableBody>
                  <TableRow sx={styles.row}>
                    <TableCell sx={styles.head}>{disposition.title}</TableCell>
                    <TableCell sx={styles.head} align="center">
                      {disposition.user}
                    </TableCell>
                    <TableCell sx={styles.head} align="center">
                      {disposition.opponent}
                    </TableCell>
                  </TableRow>

                  {TableRowFormater(headquarters, deckStrength)}

                  <TableRow sx={styles.row}>
                    <TableCell sx={styles.head}>{statistics.title}</TableCell>
                    <TableCell sx={styles.head} align="center">
                      {statistics.user}
                    </TableCell>
                    <TableCell sx={styles.head} align="center">
                      {statistics.opponent}
                    </TableCell>
                  </TableRow>

                  {TableRowFormater(
                    headquartersHealth,
                    cardsInDeck,
                    resourcesSpent,
                    vehiclesDestroyed,
                    platoonsDestroyed,
                    ordersPlayed
                  )}
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
