import { Container } from '@mui/material'

export const Deck = () => {
  let obj = {
    name: 'user',
    id: 15,
  }
  // eslint-disable-next-line
  //@ts-ignore
  obj = null

  return <Container disableGutters>This is Deck!`${obj.name}`</Container>
}
