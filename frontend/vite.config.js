import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      "/api": "https://pintrest-clone-o5vo6u2w8-shubham-meshrams-projects-cfc33b49.vercel.app",
    },
  },
  plugins: [react()],
  define: {
    global: {}, // Add this to polyfill global
  },
})


