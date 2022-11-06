import React, { memo, useCallback } from 'react'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { ICardItem } from '../../typings'

const styles = {
  card: {
    display: 'grid',
    height: '280px',
    width: '200px',
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
}

export const Card: React.FunctionComponent<ICardItem> = memo(props => {
  const handleOnClick = useCallback(
    () => props.onClick(props.item),
    [props.item, props.onClick]
  )

  const handleOnClickInfo = useCallback(
    () => props.onClickInfo(props.item),
    [props.item, props.onClickInfo]
  )

  return (
    <Box>
      <Box onClick={handleOnClick} sx={styles.card}>
        <Typography sx={{ alignSelf: 'center' }}>{props.item.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="primary"
          onClick={handleOnClickInfo}
          sx={styles.cardButtonInfo}>
          Информация
        </Button>
      </Box>
    </Box>
  )
})
