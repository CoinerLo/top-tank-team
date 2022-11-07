import { Key } from 'react'
import { CardUpgrade } from '.'
import { ICardUpgrade } from '../../../typings'

export const RenderCards = (card: ICardUpgrade, idx: Key) => (
  <CardUpgrade key={idx} name={card.name} />
)
