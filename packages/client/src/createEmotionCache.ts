import createCache from '@emotion/cache'
import { v4 as uuidv4 } from 'uuid'
import { Buffer } from 'buffer'

const isBrowser = typeof document !== 'undefined'

export default function createEmotionCache() {
  const nonce = Buffer.alloc(64, uuidv4()).toString('base64')

  let insertionPoint

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  const cache = createCache({
    key: 'css',
    insertionPoint,
    nonce,
    prepend: true,
  })

  return { cache, nonce }
}

export const { cache, nonce } = createEmotionCache()
