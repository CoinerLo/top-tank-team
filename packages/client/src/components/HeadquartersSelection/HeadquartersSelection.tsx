import { Dispatch, FC, SetStateAction, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Button, styled } from '@mui/material'
import { fullHeadquartersDeck } from '../../gameCore/models/HeadquartersDeck'

interface IHeadquartersSelection {
  setHeadquarters: Dispatch<SetStateAction<string>>
  setAvatar: Dispatch<SetStateAction<string>>
}

const CustomizedRadio = styled(Radio)`
  &.Mui-checked {
    color: #cb7007;
  }
`
export const HeadquartersSelection: FC<IHeadquartersSelection> = ({
  setHeadquarters,
  setAvatar,
}) => {
  const [value, setValue] = useState(fullHeadquartersDeck[0].name)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value
    setValue(newValue)
    setAvatar(newValue)
  }

  const handleClickButton = () => {
    setHeadquarters(value)
  }

  return (
    <FormControl>
      <FormLabel
        sx={{ mb: '10px', textAlign: 'center', fontSize: '24px' }}
        color="secondary"
        id="headquartersSelection">
        Штабы
      </FormLabel>
      <RadioGroup
        aria-labelledby="headquartersSelection"
        defaultValue="female"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}>
        {fullHeadquartersDeck.map(card => {
          const { name, id } = card
          return (
            <FormControlLabel
              value={name}
              control={<CustomizedRadio />}
              label={name}
              key={id}
            />
          )
        })}
      </RadioGroup>
      <Button
        sx={{ m: 'auto' }}
        variant="sub"
        type="button"
        onClick={handleClickButton}>
        Готов
      </Button>
    </FormControl>
  )
}
