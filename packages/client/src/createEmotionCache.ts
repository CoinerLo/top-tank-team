import createCache from '@emotion/cache'
import { v4 as uuidv4 } from 'uuid'

const isBrowser = typeof document !== 'undefined'

export const nonce = Buffer.from(uuidv4()).toString('base64')

export default function createEmotionCache() {
  let insertionPoint

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({
    key: 'css',
    insertionPoint,
    nonce: nonce,
    prepend: true,
  })
}
