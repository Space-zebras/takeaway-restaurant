import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'packages/core'),

      '@pages': path.resolve(__dirname, 'packages/pages'),

      '@base': path.resolve(__dirname, 'packages/base')
    }
  }
})
