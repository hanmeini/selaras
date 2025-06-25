import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, 
    port: 5173,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
    allowedHosts: ['.ngrok-free.app'],
        proxy: {
      // Setiap permintaan ke '/api' akan diteruskan ke server backend Anda
      '/api': {
        target: 'http://localhost:3001', // Alamat server backend Anda
        changeOrigin: true,
        // Hapus '/api' dari awal path sebelum meneruskan
        // contoh: /api/ask -> /ask
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})