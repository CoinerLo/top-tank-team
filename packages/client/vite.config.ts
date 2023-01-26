import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
    __REDIRECT_URI__: `'${process.env.REDIRECT_URI}'` || `'http://localhost:3000'`,
    __SERVER_URL__: `'${process.env.SERVER_URL}'` || `'http://localhost:3001'`,
  },
  plugins: [react()],
})
