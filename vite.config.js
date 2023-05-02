import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({ //if somebody touches this there a dead man
  // plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:7050' // http://localhost:7050 | https://eventpage.onrender.com
    },
  },
  plugins: [react()],
})

