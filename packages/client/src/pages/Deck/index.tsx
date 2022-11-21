import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { SubMenu } from '../../components/SubMenu/SubMenu'
import { useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AppRoute } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import 'swiper/css'
import 'swiper/css/pagination'
import { allCardsForDeck } from '../../gameCore/allCardsForDeck'
import { Tank } from '../../gameCore/models/TanksDeck'
import { useAppDispatch, useAppselector } from '../../hooks'
import { decksSlice } from '../../store/slices/decksSlice/decksSlice'
import CloseIcon from '@mui/icons-material/Close'
import { COUNT_CARDS_IN_PLAYER_DECK } from '../../gameCore/consts'

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
  modalErrorWindow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    minHeight: '200px',
  },
}

export const Deck = () => {
  const navigate = useNavigate()
  const goHeadquarters = () => navigate(`/${AppRoute.Headquarters}`)

  const DEFAULT_DECK = 'first'

  const { decks } = useAppselector(({ DECKS }) => DECKS)
  const { saveUserDeck, addUserDeck } = decksSlice.actions
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [errorSaveDeck, setErrorSaveDeck] = useState(false)
  const [choiceDeck, setChoiceDeck] = useState(DEFAULT_DECK)
  const [nameNewDeck, setNameNewDeck] = useState('')

  const [currentDeck, setCurrentDeck] = useState(decks.first)
  const [collectionState, setCollectionState] = useState(
    allCardsForDeck.filter(collection => {
      return !decks[DEFAULT_DECK].includes(collection)
    })
  )

  const permissionSave = !(currentDeck.length == COUNT_CARDS_IN_PLAYER_DECK)

  //TODO Расписать дефолтный объект (сразу не получилось...) (Xroniks - Павел Постников)
  const [cardItem, setCardItem] = useState(allCardsForDeck[0])

  const handleChangeChoiceDeck = useCallback(
    (event: SelectChangeEvent) => {
      const choiceValue = event.target.value
      setChoiceDeck(choiceValue)
      setCurrentDeck(decks[choiceValue])
      setCollectionState(
        allCardsForDeck.filter(collection => {
          return !decks[choiceValue].includes(collection)
        })
      )
    },
    [decks]
  )
  //TODO Доделать логику, при добавлении новой колоды, выводить её сразу в currentDeck (Xroniks - Постников Павел)
  const handleAddNewDeck = useCallback(() => {
    dispatch(addUserDeck(nameNewDeck))
    setNameNewDeck('')
  }, [nameNewDeck])

  const handleChangeNameDeck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNameNewDeck(event.target.value)
    },
    []
  )
  //TODO Доделать логику, если колода с таким названием есть, не переписывать её новыми картами а выкинуть сообщение о том, что колода уже существует!) (Xroniks - Постников Павел)
  const handleSaveDeck = useCallback(() => {
    if (permissionSave) {
      setErrorSaveDeck(true)
    } else {
      dispatch(saveUserDeck({ data: currentDeck, name: `${choiceDeck}` }))
    }
  }, [currentDeck])

  const handleClickCardCollection = useCallback(
    (item: Tank) => {
      setCollectionState(collectionState.filter(i => i.id !== item.id))
      setCurrentDeck([item, ...currentDeck])
    },
    [currentDeck]
  )

  const handleClickCardDeck = useCallback(
    (item: Tank) => {
      setCurrentDeck(currentDeck.filter(i => i.id !== item.id))
      setCollectionState([item, ...collectionState])
    },
    [collectionState]
  )

  const handleClickCardInfo = useCallback((item: Tank) => {
    setIsOpen(true)
    setCardItem(item)
  }, [])

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
                    color: permissionSave ? 'red' : '#EAE3CC',
                  }}>{`${currentDeck.length}/30`}</Typography>
              </Box>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="deckSelect">Колода</InputLabel>
              <Select
                labelId="deckSelect"
                id="demo-select-small"
                value={choiceDeck}
                label="Колода"
                onChange={handleChangeChoiceDeck}>
                {Object.keys(decks).map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant={'sub'}
              size={'small'}
              onClick={handleSaveDeck}
              sx={{ height: '40px', alignSelf: 'center' }}>
              Сохранить
            </Button>
            <Button
              variant={'sub'}
              size={'small'}
              onClick={handleAddNewDeck}
              sx={{
                marginLeft: '10px',
                height: '40px',
                alignSelf: 'center',
              }}>
              Создать
            </Button>
            <TextField
              label="Название новой колоды"
              size="small"
              margin="dense"
              value={nameNewDeck}
              onChange={handleChangeNameDeck}
              sx={{
                marginLeft: '10px',
                height: '40px',
                alignItems: 'center',
              }}
            />
          </Box>
          <Box sx={{ flex: 1, height: '300px', marginTop: '10px' }}>
            <Swiper width={200} spaceBetween={20} className="mySwiper">
              {currentDeck.map(item => (
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
          <Typography
            onClick={() => setIsOpen(false)}
            component="span"
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}>
            <CloseIcon />
          </Typography>
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
      <Modal
        disableAutoFocus
        open={errorSaveDeck}
        onClose={() => setErrorSaveDeck(false)}>
        <Box sx={styles.modalErrorWindow}>
          <Typography
            onClick={() => setErrorSaveDeck(false)}
            component="span"
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              right: '10px',
              top: '10px',
            }}>
            <CloseIcon />
          </Typography>
          <Typography alignSelf="center" marginBottom="20px" variant="h3">
            Нельзя сохранить колоду!
          </Typography>
          <Typography>В вашей колоде должно быть ровно 30 карт!</Typography>
        </Box>
      </Modal>
    </Container>
  )
}
