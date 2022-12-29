import { BasicTable } from './BasicTable'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'
// import { useAppselector } from '../../../hooks'

// import * as redux from 'react-redux'

// const spy = jest.spyOn(redux, 'useAppselector')

describe('Basic table component. NO TEST!', () => {
  it('Renders table. NO TEST!', () => {
    // jest.mock('useAppselector')
    jest.mock('../../../hooks')

    render(
      <Provider store={store}>
        <BasicTable />
      </Provider>
    )

    const table = screen.getByRole('table')

    expect(table).toBeTruthy
  })
})
