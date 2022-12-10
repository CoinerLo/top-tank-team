import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
dotenv.config()

// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'

import express from 'express'
import { createClientAndConnect } from './db'
import serverRenderMiddleware from './server-render-middleware'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/*', serverRenderMiddleware)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
