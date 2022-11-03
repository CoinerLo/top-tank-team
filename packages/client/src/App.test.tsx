import { render, screen } from '@testing-library/react'
import { Error404 } from './pages/Error404'

const appContent = 'This is Error404!'

// eslint-disable-next-line
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<Error404 />)
  expect(screen.getByText(appContent)).toBeDefined()
})
