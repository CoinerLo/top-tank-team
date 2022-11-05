import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SubMenu } from '../../components/SubMenu'

import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import './styles.css'

// import required modules
import { Pagination, Navigation } from 'swiper'
import { AppRoute } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'

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
}

export const DeckItem = (props: Record<string, string>) => {
  return <Box sx={{ width: '100px', height: '200px' }}>{props.name}</Box>
}

export const Deck = () => {
  const navigate = useNavigate()
  const [col, setCollection] = useState(collection)
  const [dec, setDeck] = useState(deck)

  const goHeadquarters = () => navigate(`/${AppRoute.Headquarters}`)

  return (
    <Container disableGutters sx={styles.container}>
      <SubMenu />
      <Button
        onClick={goHeadquarters}
        variant="primary"
        sx={{
          margin: '10px',
          padding: '10px',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          left: 0,
        }}>
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
            {col.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  onClick={function () {
                    console.log('Click on: ')
                    setCollection([...col.slice(0, idx), ...col.slice(idx + 1)])
                    dec.unshift(item)
                    setDeck([...dec])
                  }}
                  sx={{
                    display: 'grid',
                    height: '280px',
                    backgroundColor: '#c03f3f',
                    borderRadius: '5px 5px 0 0',
                    textAlign: 'center',
                  }}>
                  <Typography sx={{ alignSelf: 'center' }}>
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="primary"
                    sx={{
                      background: 'grey',
                      width: '100%',
                      height: '20px',
                      fontSize: '10px',
                      pt: '5px',
                      pb: '5px',
                      borderRadius: '0 0 5px 5px',
                    }}>
                    Информация
                  </Button>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', marginTop: '20px' }}>
            <Typography>Колода</Typography>
            <Typography>Название штаба:</Typography>
            <Typography>{`${dec.length}/40`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', height: '300px', marginTop: '10px' }}>
            <Swiper
              width={200}
              spaceBetween={20}
              centeredSlides={true}
              modules={[Pagination]}
              className="mySwiper">
              {dec.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Box
                    onClick={function () {
                      console.log('Click on: ' + item.name)
                      setDeck([...dec.slice(0, idx), ...dec.slice(idx + 1)])
                      setCollection([...col, item])
                    }}
                    sx={{
                      display: 'grid',
                      height: '280px',
                      backgroundColor: '#c03f3f',
                      borderRadius: '5px 5px 0 0',
                      textAlign: 'center',
                    }}>
                    <Typography sx={{ alignSelf: 'center' }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="primary"
                      sx={{
                        background: 'grey',
                        width: '100%',
                        height: '20px',
                        fontSize: '10px',
                        pt: '5px',
                        pb: '5px',
                        borderRadius: '0 0 5px 5px',
                      }}>
                      Информация
                    </Button>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* здесь карусель калоды игрока */}
        </Box>
      </Box>
    </Container>
  )
}
