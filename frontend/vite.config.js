import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://shopease-gxkt.onrender.com', // the address of your backend server
      }
    }
  },
  plugins: [react()],
})
