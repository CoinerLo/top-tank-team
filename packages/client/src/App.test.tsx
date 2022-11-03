import { render, screen } from '@testing-library/react'
import { Briefing } from './pages/Briefing'

const appContent = 'This is Briefing!'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<Briefing />)
  expect(screen.getByText(appContent)).toBeDefined()
})
