import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { SubMenu } from '../../components/SubMenu/SubMenu'
import { useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AppRoute } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import { deck, collection } from './data'
import { Card } from '../../components/Card/Card'
import { ICollectionCardItem } from '../../typings'
import 'swiper/css'
import 'swiper/css/pagination'
import { allCardsForDeck } from '../../gameCore/allCardsForDeck'
import { Tank } from '../../gameCore/models/TanksDeck'
import { getRandomUserDeck } from '../../gameCore/mockData'
import { COUNT_CARDS_IN_PLAYER_DECK } from '../../gameCore/consts'
import { useAppDispatch, useAppselector } from '../../hooks'
import { decksSlice } from '../../store/slices/userSlice/decksSlice'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonHome: {
    margin: '10px',
    padding: '10px',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    left: 0,
  },
  modalWindow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    justifyContent: 'space-between',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24px',
    padding: '25px',
  },
  cardButtonInfo: {
    display: 'flex',
    justifyContent: 'center',
    background: 'grey',
    width: '100%',
    height: '20px',
    fontSize: '10px',
    pt: '5px',
    pb: '5px',
    borderRadius: '0 0 5px 5px',
  },
}

let testDeck = getRandomUserDeck(COUNT_CARDS_IN_PLAYER_DECK)
let testDeckSecond = [...testDeck]
const testColletion = [
  ...allCardsForDeck.filter(col => {
    return !testDeck.includes(col)
  }),
]

export const Deck = () => {
  const { decks } = useAppselector(state => state.DECKS)
  // const { getStartDeck } = decksSlice.actions
  // const dispatch = useAppDispatch()
  //
  // dispatch(getStartDeck())

  const [isOpen, setIsOpen] = useState(false)
  const [collectionState, setCollectionState] = useState(testColletion)
  const [deckState, setDeckState] = useState(decks.first)
  const [cardItem, setCardItem] = useState(allCardsForDeck[0])
  const [choiceDeck, setChoiceDeck] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setChoiceDeck(event.target.value)
    if (choiceDeck == '1') {
      testDeckSecond = deckState
      setDeckState(testDeck)
      setCollectionState([
        ...allCardsForDeck.filter(col => {
          return !deckState.includes(col)
        }),
      ])
    } else if (choiceDeck == '2') {
      testDeck = deckState
      setDeckState(testDeckSecond)
      setCollectionState([
        ...allCardsForDeck.filter(col => {
          return !deckState.includes(col)
        }),
      ])
    }
  }

  const navigate = useNavigate()

  const handleClickCardCollection = useCallback(
    (item: Tank) => {
      setCollectionState(collectionState.filter(i => i.id !== item.id))
      setDeckState([item, ...deckState])
    },
    [deckState]
  )

  const handleClickCardDeck = useCallback(
    (item: Tank) => {
      setDeckState(deckState.filter(i => i.id !== item.id))
      setCollectionState([item, ...collectionState])
    },
    [collectionState]
  )

  const handleClickCardInfo = useCallback((item: Tank) => {
    setIsOpen(true)
    setCardItem(item)
  }, [])

  const goHeadquarters = () => navigate(`/${AppRoute.Headquarters}`)

  return (
    <Container disableGutters sx={styles.container}>
      <SubMenu />

      <Button onClick={goHeadquarters} variant="primary" sx={styles.buttonHome}>
        <Box component="img" src="/home.svg" alt="Go home" width="25px" />
      </Button>

      <Box sx={{ width: '80%', height: '70%', marginTop: '20px' }}>
        <Box sx={{ flex: 1 }}>
          <Typography>Коллекция:</Typography>
        </Box>
        <Box sx={{ flex: 1, height: '300px', marginTop: '10px' }}>
          <Swiper width={200} spaceBetween={20} className="mySwiper">
            {collectionState.map(item => (
              <SwiperSlide key={item.id}>
                <Card handleCardClick={handleClickCardCollection} item={item} />
                <Button
                  variant="primary"
                  onClick={() => handleClickCardInfo(item)}
                  sx={styles.cardButtonInfo}>
                  Информация
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Box sx={{ display: 'grid' }}>
              <Typography>Колода</Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography>Название штаба:</Typography>
                <Typography
                  sx={{
                    marginLeft: '5px',
                  }}>{`${deckState.length}/40`}</Typography>
              </Box>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="deckSelect">Колода</InputLabel>
              <Select
                labelId="deckSelect"
                id="demo-select-small"
                value={choiceDeck}
                label="Колода"
                onChange={handleChange}>
                <MenuItem value={'1'}>Первая</MenuItem>
                <MenuItem value={'2'}>Вторая</MenuItem>
              </Select>
            </FormControl>
            <Button variant={'sub'} size={'small'}>
              Сохранить
            </Button>
          </Box>
          <Box sx={{ flex: 1, height: '300px', marginTop: '10px' }}>
            <Swiper width={200} spaceBetween={20} className="mySwiper">
              {deckState.map(item => (
                <SwiperSlide key={item.id}>
                  <Card handleCardClick={handleClickCardDeck} item={item} />
                  <Button
                    variant="primary"
                    onClick={() => handleClickCardInfo(item)}
                    sx={styles.cardButtonInfo}>
                    Информация
                  </Button>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
      <Modal disableAutoFocus open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={styles.modalWindow}>
          <Typography textAlign="center" marginBottom="20px" variant="h2">
            Описание карты: {cardItem.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}>
            <Card item={cardItem} handleCardClick={() => null}></Card>
            <Box sx={{ ml: '15px', width: '350px' }}>
              <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
                Особенность:
              </Typography>
              <Typography component={'p'}>
                Средние танки - самый универсальный тип техники, а ещё они могут
                передвигаться по диагонали.
              </Typography>
              <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
                Способность №1:
              </Typography>
              <Typography component={'p'}>
                Огневая мощь увеличивается на 1 за каждую технику противника на
                соседних клетках.
              </Typography>
              <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
                Способность №2:
              </Typography>
              <Typography component={'p'}>
                Ваш штаб может быть атаковано только один раз за ход.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}
