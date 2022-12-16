import fs from 'node:fs'
import path from 'node:path'
import express from 'express'

const isTest = process.env.VITEST

process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop'

export async function createServer(
  hmrPort = 5174,
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
) {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('../client/dist/client/index.html'), 'utf-8')
    : ''

  const app = express()

  let vite: any
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('../client/dist/client'), {
        index: false,
      })
      )
    }
    
  app.get(/\.(js|css)$/, express.static(resolve('../client/dist/client')))
  app.get(
    /\.(png|ico|svg|jpg)$/,
    express.static(resolve('./dist/public'))
  )

  app.use('*', async (req, res) => {
    try {
      const url = req.url

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('../client/dist/client/index.html'), 'utf-8')
        // template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('../client/src/entry-server.tsx'))
          .render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('../client/dist/ssr/entry-server.cjs')).render
      }

      // const context = {}

      const { html: test, css, store } = render(url)
      const storeString = JSON.stringify(store).replace(/</g, '\\u003c')

      // if (context.url) {
      //   // Somewhere a `<Redirect>` was rendered
      //   return res.redirect(301, context.url)
      // }

      const html = template
        .replace(`<!--ssr-outlet-->`, test)
        .replace('<!--css-outlet-->', css)
        .replace('ssr-store', storeString)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })


  return { app, vite }
}


if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173')
    })
  )
}
