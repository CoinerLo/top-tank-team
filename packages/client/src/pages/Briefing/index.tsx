import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'

export const Briefing = () => {
  return (
    <Container
      disableGutters
      sx={{
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
        overflowY: 'scroll',
      }}>
      <Typography variant="h1" sx={{ mt: '50px' }}>
        Правила боя в WoT Generals
      </Typography>
      <Box m="10px" width="75%">
        <Typography>
          World of Tanks Generals — игра между двумя соперниками. Игроки ходят
          по очереди, разыгрывают карты из руки, перемещают карты на поле боя и
          атакуют противника. Главной целью игры является уничтожение штаба
          противника.
        </Typography>
      </Box>
      <Box mb="10px" mt="20px" width="75%">
        <Typography variant="h2">Ангар</Typography>
        <Box
          component="img"
          src="/Briefing-01.png"
          alt="Hangar"
          sx={{
            width: '50%',
            border: '1px solid #EAE3CC',
            mt: '10px',
            mb: '10px',
          }}
        />
        <List>
          <ListItem sx={{ position: 'relative', zIndex: 'auto' }}>
            1 - Панель выбора колоды
          </ListItem>
          <ListItem>2 - В БОЙ!</ListItem>
          <ListItem>3 - Переключатель режима игры</ListItem>
          <ListItem>4 - Редактировать</ListItem>
          <ListItem>5 - Исследования</ListItem>
          <ListItem>6 - Панель снаряжения</ListItem>
          <ListItem>6 - Панель снаряжения</ListItem>
          <ListItem>7 - Премиум раздел</ListItem>
        </List>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Экран сражения</Typography>
          <Typography mt="10px">
            После выхода в бой открывается экран сражения.
          </Typography>
          <Box
            component="img"
            src="/Briefing-02.png"
            alt="Battle Screen"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>1 - Поле боя</ListItem>
            <ListItem>2 - Плацдарм</ListItem>
            <ListItem>3 - Штаб</ListItem>
            <ListItem>4 - Штаб противника</ListItem>
            <ListItem>5 - Зона поддержки штаба</ListItem>
            <ListItem>6 - Колода</ListItem>
            <ListItem>7 - Потери</ListItem>
            <ListItem>8 - Рука, или резерв</ListItem>
            <ListItem>9 - Таймер</ListItem>
            <ListItem>10 - Счётчик ресурсов</ListItem>
            <ListItem>11 - Кнопка передачи хода</ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Поле боя</Typography>
          <Typography mt="10px">
            Местом основных боевых действий является поле боя , разделённое на
            15 клеток.
          </Typography>
          <Box
            component="img"
            src="/Briefing-03.png"
            alt="Battlefield"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Поле боя 1 включает плацдарм 2 — три клетки рядом со штабом.
              Карты техники выводятся на плацдарм.
            </ListItem>
            <ListItem>
              - Перед началом игры карты штабов 3, 4 помещаются в противополжные
              углы поля боя. Штаб противника располагается в верхней части поля.
            </ListItem>
            <ListItem>
              - Зона поддержки штаба 5 расположена слева от поля боя. Карты
              взводов выводятся в зону поддержки штаба.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Рука игрока и потери</Typography>
          <Typography mt="10px">
            Рука, или резерв 8 — это карты, которые игрок разыгрывает на текущем
            ходу. Потери 7 – это карты, которые в дальнейшей игре участия не
            принимают.
          </Typography>
          <Box
            component="img"
            src="/Briefing-04.png"
            alt="Player hand and loss"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Перед боем каждый игрок получает по шесть карт из колоды 6.
              Карты выбираются случайным образом. Эти шесть карт являются
              стартовой рукой.
            </ListItem>
            <ListItem>
              - В начале каждого своего хода игрок получает в руку по одной
              карте из колоды. Карта выбирается случайным образом. Однако игрок,
              который ходит первым, не получает карту в свой первый ход.
            </ListItem>
            <ListItem>
              - Если в конце хода в руке игрока находится более шести карт, то
              лишние карты сбрасываются в потери. В потери также попадают
              уничтоженные карты техники и взводов, разыгранные карты приказов.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Ресурсы и прирост ресурсов</Typography>
          <Typography mt="10px">
            Ресурсы — это средства для платы за розыгрыш карт из руки. Прирост
            ресурсов карты — это количество ресурсов, которое карта приносит
            каждый ход, если находится на поле боя или в зоне поддержки штаба.
            Прирост ресурсов указан на картах в верхнем правом углу.
          </Typography>

          <Box
            component="img"
            src="/Briefing-05.png"
            alt="Resources and resource growth"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Игрок получает ресурсы в начале каждого своего хода.
            </ListItem>
            <ListItem>
              - Общий прирост ресурсов меняется на протяжении игры и равен сумме
              прироста ресурсов всех карт на поле боя и в зоне поддержки штаба.
            </ListItem>
            <ListItem>
              - Количество ресурсов, доступное на текущем ходу, и количество
              ресурсов, доступное на следующем ходу, отображается на счётчике
              ресурсов 10.
            </ListItem>
            <ListItem>
              - Неиспользованные за текущий ход ресурсы сгорают в начале
              следующего хода.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Ход игрока</Typography>
          <Box
            component="img"
            src="/Briefing-06.png"
            alt="Player turn"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Выбор игрока, которому принадлежит первый ход, осуществляется
              случайным образом.
            </ListItem>
            <ListItem>
              - Время хода ограничено. Время до окончания хода отображается под
              кнопкой передачи хода 11.
            </ListItem>
            <ListItem>
              - В течение хода можно: – использовать снаряжение; – разыгрывать
              карты из руки; – перемещать технику на поле боя; – атаковать
              противника.
            </ListItem>
            <ListItem>
              - После совершения хода игрок нажимает на кнопку передачи хода.
            </ListItem>
            <ListItem>
              - Если игрок не совершает никаких действий в течение двух минут,
              ход автоматически передаётся другому игроку.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Розыгрыш карт</Typography>
          <Box
            component="img"
            src="/Briefing-07.png"
            alt="Card draw"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Для розыгрыша карт из руки игрок расходует ресурсы. Стоимость
              розыгрыша указана на каждой карте в верхнем левом углу.
            </ListItem>
            <ListItem>
              - Область размещения карты на экране сражения зависит от типа
              карты. Техника помещается только на плацдарм 2, взводы — в зону
              поддержки штаба 5. Приказы помещаются на карты, поле боя 1 или его
              часть и после розыгрыша отправляются в потери.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Перемещение техники</Typography>
          <Box
            component="img"
            src="/Briefing-08.png"
            alt="Moving equipment"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - После розыгрыша карт техники игрок может перемещать технику на
              поле боя.
            </ListItem>
            <ListItem>
              - Направление перемещения карт техники и количество перемещений
              зависят от класса техники.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Атаки и контратаки</Typography>
          <Box
            component="img"
            src="/Briefing-09.png"
            alt="Attacks and counterattacks"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Для атаки противника игрок может использовать штаб и карты
              техники.
            </ListItem>
            <ListItem>- После атаки техника противника контратакует.</ListItem>
            <ListItem>
              - Вся техника, кроме ПТ-САУ, атакует и контратакует одновременно.
            </ListItem>
            <ListItem>
              - Карта на поле боя может атаковать один раз за ход игрока и
              контратаковать один раз за ход его противника.
            </ListItem>
            <ListItem>
              - Манера атаки и контратаки карты зависит от типа карт и класса
              техники.
            </ListItem>
          </List>
        </Box>
        <Box mb="10px" mt="20px" width="100%">
          <Typography variant="h2">Окончание боя</Typography>
          <Box
            component="img"
            src="/Briefing-10.png"
            alt="End of the fight"
            sx={{
              width: '50%',
              border: '1px solid #EAE3CC',
              mt: '10px',
              mb: '10px',
            }}
          />
          <List>
            <ListItem>
              - Обычно бой длится до тех пор, пока один из штабов не уничтожен,
              однако продолжительность боя для каждого игрока не может превышать
              15 минут.
            </ListItem>
            <ListItem>
              - Каждый из игроков может завершить бой в любой момент, нажав на
              (Белый флаг) в верхнем левом углу.
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  )
}
