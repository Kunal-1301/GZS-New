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
      '@components': fileURLToPath(new URL('./src/global/common_ui', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/public/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@context': fileURLToPath(new URL('./src/global/context', import.meta.url)),
      '@auth': fileURLToPath(new URL('./src/global/auth', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@studio': fileURLToPath(new URL('./src/public/studio', import.meta.url)),
    },
  },
})
