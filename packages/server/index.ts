import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import path from 'path'
import fs from 'fs'
dotenv.config({ path: '../../.env' })

import express from 'express'
import { dbConnect } from './db'
import router from './router'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  await dbConnect(isDev())

  const app = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.use(router)

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/', express.static(path.resolve(distPath, '')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
        if (!vite) {
          console.log('Error! Vite is not defined')
          return
        }
        template = await vite.transformIndexHtml(url, template)
      }

      let render: (url: string) => Promise<{
        html: string
        css: string
        nonce: string
      }>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        if (!vite) {
          console.log('Error! Vite is not defined')
          return
        }
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const { html: appHtml, css, nonce } = await render(url)

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--css-outlet-->', css)
        .replace(
          '<script type="module">',
          `<script type="module" nonce="${nonce}">`
        )

      res.setHeader(
        'Content-Security-Policy',
        `default-src 'self' ${process.env.SERVER_URL} https://ya-praktikum.tech; script-src 'self' 'unsafe-eval' https://ya-praktikum.tech 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; connect-src ws://localhost:* https://ya-praktikum.tech ${process.env.SERVER_URL}; font-src 'self' data:;`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        if (!vite) {
          console.log('Error! Vite is not defined')
          return
        }
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
