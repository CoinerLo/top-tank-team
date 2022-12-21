export {}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __PRELOADED_STATE__: any
  }
}
