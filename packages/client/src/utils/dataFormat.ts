import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'

export const humanizeDate = (correctDate: Date) =>
  format(new Date(correctDate), 'dd LLL - HH:mm', {
    locale: ru,
  })
