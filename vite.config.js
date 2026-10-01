import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // demo.html is a standalone page for comparing hero effects
      input: { main: resolve(import.meta.dirname, 'index.html'), demo: resolve(import.meta.dirname, 'demo.html') },
    },
  },
})
