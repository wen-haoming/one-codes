import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir:'/',
    outDir:'./src/dist',
    rollupOptions: {
      output:{
        entryFileNames:'index.js'
      },
      input: {
        main: resolve(__dirname, './src/render/index.html'),
      },
    },
  },
})



