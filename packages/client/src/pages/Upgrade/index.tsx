import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubMenu } from '../../components/SubMenu/SubMenu'
import { German } from '../../components/upgrade/German/German'
import { Usa } from '../../components/upgrade/Usa/Usa'
import { Ussr } from '../../components/upgrade/Ussr/Ussr'
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
  ger: <German />,
} as Record<string, JSX.Element>

export const Upgrade = () => {
  const navigate = useNavigate()
  const [currentNation, setCurrentNation] = useState('ussr')

  const goHeadquarters = () => navigate(`/${AppRoute.Headquarters}`)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment) {
      setCurrentNation(newAlignment)
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
          value={currentNation}
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
        {nations[currentNation]}
      </Box>
    </Container>
  )
}
