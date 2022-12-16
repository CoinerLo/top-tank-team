import { render, screen } from '@testing-library/react'
import { Error404 } from './pages/Error404'

const appContent = 'Ваш отряд заблудился!'
const mockedUsedNavigate = jest.fn()

// eslint-disable-next-line
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

test('Example test', async () => {
  render(<Error404 />)
  expect(screen.getByText(appContent)).toBeDefined()
})
