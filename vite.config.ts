import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@components", replacement: "/src/components"},
      {find: "@pages", replacement: "/src/pages"},
      {find: "@assets", replacement: "/src/assets"},
      {find: "@constants", replacement: "/src/constants"},
      {find: "@schemata", replacement: "/src/schemata"},
      {find: "@", replacement: "/src"},
    ],
  }
})
