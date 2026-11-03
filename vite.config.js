import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://almarga.github.io/unitydeveloper-portfolio/ — the subfolder is the base for build and preview, not the dev server.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/unitydeveloper-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
