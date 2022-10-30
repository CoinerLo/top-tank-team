import { render, screen } from '@testing-library/react'
import { About } from './pages/About'

const appContent = 'This is about!'

// eslint-disable-next-line
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<About />)
  expect(screen.getByText(appContent)).toBeDefined()
})
