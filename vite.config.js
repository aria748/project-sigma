import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import plugin baru

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Aktifkan di sini
  ],
})