import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'ssr-dist',
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
    ssr: true,
  },
  ssr: {
    target: 'node',
    noExternal: ['react-router-dom', 'swiper', 'ssr-window', 'dom7'],
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
})
