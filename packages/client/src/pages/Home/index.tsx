import React from 'react'
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  Container,
} from '@mui/material'

export const Home = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="h1">
        WoT Generals - игра для настоящих мужчин!
      </Typography>
      <Box mb="10px">
        <Typography variant="h2">Краткое описание игры.</Typography>
        <Typography>
          World of Tanks Generals представляет собой пошаговую стратегию с двумя
          типами матчей — матчами один на один с реальным противником и
          тренировочными боями против ИИ. Игровой процесс происходит на игровом
          поле высотой три и шириной пять клеток. Колода каждого игрока состоит
          из 40 карт, в «руке» игрока находится до 6 карт; игроки размещают свои
          карты танков в квадратах, окружающих их карту штаба. После
          развёртывания карт игроки могут перемещать карты танков на любую
          соседнюю незанятую позицию во время своих ходов. Побеждает игрок, чьи
          карты танков понижают очки прочности карты штаба противника до нуля.
        </Typography>
      </Box>
      <Box mb="10px" width="100%">
        <Typography variant="h2">Небольшой инструктаж по механике.</Typography>
        <Typography>
          Каждая карта танка обладает уникальными наступательными и
          оборонительными способностями:
        </Typography>
        <List>
          <ListItem>
            <Typography>
              1 - Лёгкие танки могут передвигаться на клетку дальше,
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              2 - Средние — обладают способностью ходить по диагонали,
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>
              3 - Тяжёлые могут передвигаться вперёд-назад и вверх-вниз,
            </Typography>
          </ListItem>
        </List>
      </Box>
      <Button variant="outlined">В бой!</Button>
    </Container>
  )
}
