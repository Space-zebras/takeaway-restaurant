import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app/pages': path.resolve(__dirname, 'packages/pages'),
      '@app/base': path.resolve(__dirname, 'packages/base'),
      '@app/core': path.resolve(__dirname, 'packages/core'),
      '@app/shared': path.resolve(__dirname, 'packages/shared')
    }
  }
})
