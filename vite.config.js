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
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // Optimize chunk sizes
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-animation';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-ui';
          }
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'vendor-query';
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'vendor-forms';
          }
          if (id.includes('node_modules/axios') || id.includes('node_modules/zustand')) {
            return 'vendor-utils';
          }
          // Feature chunks - only for larger features
          if (id.includes('src/features/tournaments')) {
            return 'chunk-tournaments';
          }
          if (id.includes('src/features/community')) {
            return 'chunk-community';
          }
          if (id.includes('src/features/profile')) {
            return 'chunk-profile';
          }
          if (id.includes('src/services/mockApiService')) {
            return 'chunk-mock';
          }
          if (id.includes('src/shared/data')) {
            return 'chunk-data';
          }
          if (id.includes('src/features/admin')) {
            return 'chunk-admin';
          }
          if (id.includes('src/features/games')) {
            return 'chunk-games';
          }
        },
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|gif|svg|webp/.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|eot|ttf|otf/.test(extType)) {
            extType = 'fonts';
          } else if (extType === 'css') {
            extType = 'css';
          } else {
            extType = 'misc';
          }
          return `assets/${extType}/[name].[hash][extname]`;
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Use esbuild for minification (no additional dependencies needed)
    minify: 'esbuild',
    // Source maps for production debugging (optional, remove in production if size matters)
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'esnext',
  },
  // Optimization for dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'axios',
      'zustand',
      'jwt-decode',
    ],
    exclude: ['@tailwindcss/vite'],
  },
})
