import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      "/api": "https://printrest-clone-api.onrender.com",
    },
  },
  plugins: [react()],
  define: {
    global: {}, // Add this to polyfill global
  },
})


