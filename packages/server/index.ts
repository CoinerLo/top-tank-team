import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'

import express from 'express'
// import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

// createClientAndConnect()

app.get(
  /\.(png|ico|svg|jpg)$/,
  express.static(path.resolve(__dirname, './dist/public'))
)

app.get('/*', (req, res) => {
  const location = req.url
  const { html, css, store } = render(location)
  const template = path.resolve(__dirname, '../client/dist/client/index.html')
  const htmlString = fs.readFileSync(template, 'utf-8')
  const storeString = JSON.stringify(store).replace(/</g, '\\u003c')
  const newPage = htmlString
    .replace('<!--ssr-outlet-->', html)
    .replace('<!--css-outlet-->', css)
    .replace('ssr-store', storeString)
  res.send(newPage)
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
