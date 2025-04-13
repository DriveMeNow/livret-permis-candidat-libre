import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // essentiel pour s'assurer que le build va dans frontend/dist
  },
  server: {
    host: true,  // accepte toutes les connexions externes
    allowedHosts: [
      '.ngrok-free.app' // autorise tous les sous-domaines ngrok
    ]
  }
});
