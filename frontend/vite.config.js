import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Any request the frontend makes to "/api/..." gets forwarded to the
    // backend Express server. This lets our React code just call
    // fetch("/api/expenses") without worrying about the backend's port
    // or CORS during development.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
