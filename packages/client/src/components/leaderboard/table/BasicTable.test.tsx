import { BasicTable } from './BasicTable'
import { render, screen } from '@testing-library/react'

describe('Basic table component', () => {
  it('Renders table', () => {
    render(<BasicTable />)

    const table = screen.getByRole('table')

    expect(table).toBeTruthy()
  })
})
