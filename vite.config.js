import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {  
    target: 'es2022', // or 'chrome80', 'firefox79', etc.  
  },  
})
