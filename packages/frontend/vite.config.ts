import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // on active le préfixe VITE_ pour charger variables d'env
  envPrefix: ['VITE_'],

  // plugins
  plugins: [react()],

  // alias pour import « @/… » vers src/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // dev server
  server: {
    port: 5173,
    open: true,
  },

  // options de build
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
