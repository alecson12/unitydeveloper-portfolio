import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://almarga.github.io/unitydeveloper-portfolio/ — the subfolder is the base in production only.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/unitydeveloper-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
