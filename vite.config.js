import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/public/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/public/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/public/data', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/public/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@context': fileURLToPath(new URL('./src/public/context', import.meta.url)),
    },
  },
})
