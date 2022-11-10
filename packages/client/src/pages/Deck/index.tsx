import { Button, Container, Modal, Typography } from '@mui/material'
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
    bgcolor: 'background.paper',
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

export const Deck = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [collectionState, setCollectionState] = useState(collection)
  const [deckState, setDeckState] = useState(deck)
  const [cardItem, setCardItem] = useState({
    name: '',
    id: '',
  })

  const navigate = useNavigate()

  const handleClickCardCollection = useCallback(
    (item: ICollectionCardItem) => {
      setCollectionState(collectionState.filter(i => i.id !== item.id))
      setDeckState([item, ...deckState])
    },
    [deckState]
  )

  const handleClickCardDeck = useCallback(
    (item: ICollectionCardItem) => {
      setDeckState(deckState.filter(i => i.id !== item.id))
      setCollectionState([item, ...collectionState])
    },
    [collectionState]
  )

  const handleClickCardInfo = useCallback((item: ICollectionCardItem) => {
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
