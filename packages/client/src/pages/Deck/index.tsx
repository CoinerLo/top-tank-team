import { Button, Container, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SubMenu } from '../../components/SubMenu'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation } from 'swiper'
import { AppRoute } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import { ICard } from '../../typings'

const collection = [
  {
    name: 'M46 Patton',
  },
  {
    name: 'ИС-7',
  },
  {
    name: 'Panther II',
  },
  {
    name: 'ИС-7',
  },
  {
    name: 'T110E5',
  },
  {
    name: 'Maus',
  },
  {
    name: 'Объект 268',
  },
]

const deck = [
  {
    name: 'Т-54',
  },
  {
    name: 'T-30',
  },
  {
    name: 'Объект 261',
  },
  {
    name: 'Объект 212',
  },
  {
    name: 'Т-34-85',
  },
  {
    name: 'Телефонисты',
  },
  {
    name: 'T110E4',
  },
]

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
  card: {
    display: 'grid',
    height: '280px',
    backgroundColor: '#c03f3f',
    borderRadius: '5px 5px 0 0',
    textAlign: 'center',
  },
  cardButtonInfo: {
    background: 'grey',
    width: '100%',
    height: '20px',
    fontSize: '10px',
    pt: '5px',
    pb: '5px',
    borderRadius: '0 0 5px 5px',
  },
  modalWindow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    justifyContent: 'space-between',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 3,
  },
}

export const Card = (props: any) => {
  return (
    <Box>
      <Box
        onClick={function () {
          console.log('Click on: ')
          props.setCollectionState([
            ...props.collectionState.slice(0, props.idx),
            ...props.collectionState.slice(props.idx + 1),
          ])
          props.deckState.unshift(props.item)
          props.setDeckState([...props.deckState])
        }}
        sx={styles.card}>
        <Typography sx={{ alignSelf: 'center' }}>{props.item.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="primary"
          onClick={() => {
            props.setIsOpen(true)
            props.setCardItem(props.item)
          }}
          sx={styles.cardButtonInfo}>
          Информация
        </Button>
      </Box>
    </Box>
  )
}

export const Deck = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [collectionState, setCollectionState] = useState(collection)
  const [deckState, setDeckState] = useState(deck)
  const [cardItem, setCardItem] = useState({
    name: 'Заглушка',
  })

  const navigate = useNavigate()

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
          <Swiper
            spaceBetween={20}
            width={200}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper">
            {collectionState.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Card
                  collectionState={collectionState}
                  setCollectionState={setCollectionState}
                  deckState={deckState}
                  setDeckState={setDeckState}
                  setIsOpen={setIsOpen}
                  setCardItem={setCardItem}
                  item={item}
                  idx={idx}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Typography>Колода</Typography>
            <Typography>Название штаба:</Typography>
            <Typography>{`${deckState.length}/40`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', height: '300px', marginTop: '10px' }}>
            <Swiper
              width={200}
              spaceBetween={20}
              centeredSlides={true}
              modules={[Pagination]}
              className="mySwiper">
              {deckState.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Card
                    collectionState={collectionState}
                    setCollectionState={setCollectionState}
                    deckState={deckState}
                    setDeckState={setDeckState}
                    setIsOpen={setIsOpen}
                    setCardItem={setCardItem}
                    item={item}
                    idx={idx}
                  />
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
            <Box
              sx={{
                display: 'grid',
                height: '280px',
                width: '200px',
                backgroundColor: '#c03f3f',
                borderRadius: '5px',
                textAlign: 'center',
              }}>
              <Typography sx={{ alignSelf: 'center' }}>
                {cardItem.name}
              </Typography>
            </Box>
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
