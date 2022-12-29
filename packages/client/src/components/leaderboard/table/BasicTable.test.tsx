import { BasicTable } from './BasicTable'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'

describe('Basic table component.', () => {
  it('Renders table.', () => {
    render(
      <Provider store={store}>
        <BasicTable />
      </Provider>
    )

    const table = screen.getByRole('table')

    expect(table).toBeTruthy
  })
})
