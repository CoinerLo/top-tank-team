import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubMenu } from '../../components/SubMenu'
import { Ger } from '../../components/upgrade/Ger'
import { Usa } from '../../components/upgrade/Usa/inex'
import { Ussr } from '../../components/upgrade/Ussr'
import { AppRoute } from '../../utils/consts'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerButtons: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    left: 0,
  },
  selected: {
    background: '#594617',
  },
}

const nations = {
  ussr: <Ussr />,
  usa: <Usa />,
  ger: <Ger />,
} as Record<string, JSX.Element>

export const Upgrade = () => {
  const navigate = useNavigate()
  const [nation, setNation] = useState('ussr')

  const goHeadquarters = () => navigate(`/${AppRoute.Headquarters}`)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment) {
      setNation(newAlignment)
    }
  }

  return (
    <Container disableGutters sx={styles.container}>
      <SubMenu />
      <Box sx={styles.containerButtons}>
        <Button
          onClick={goHeadquarters}
          variant="primary"
          sx={{ margin: '10px', padding: '10px' }}>
          <Box component="img" src="/home.svg" alt="Go home" width="25px" />
        </Button>
        <ToggleButtonGroup
          value={nation}
          exclusive
          onChange={handleChange}
          orientation="vertical"
          aria-label="Platform"
          sx={{ marginTop: '30px', background: '#343A43' }}>
          <ToggleButton value="ussr">
            <Box component="img" src="/ussrUpgrade.png" />
          </ToggleButton>
          <ToggleButton value="usa">
            <Box component="img" src="/usaUpgrade.png" />
          </ToggleButton>
          <ToggleButton value="ger">
            <Box component="img" src="/gerUpgrade.png" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box width="70%" sx={{ paddingTop: '150px' }}>
        {nations[nation]}
      </Box>
    </Container>
  )
}
