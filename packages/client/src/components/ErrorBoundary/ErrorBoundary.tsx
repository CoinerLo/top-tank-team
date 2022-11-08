import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  // eslint-disable-next-line
  public static getDerivedStateFromError(_: Error): State {
    // Обновляем состояние для отображения резервного контента при следующем рендеринге
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
