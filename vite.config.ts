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
      {find: "@store", replacement: "/src/store"},
      {find: "@routes", replacement: "/src/routes"},
      {find: "@util", replacement: "/src/util"},
      {find: "@layouts", replacement: "/src/layouts"},
      {find: "@api", replacement: "/src/api"},
      {find: "@hooks", replacement: "/src/hooks"},
      {find: "@styles", replacement: "/src/styles"},
      {find: "@context", replacement: "/src/context"},
      {find: "@", replacement: "/src"},
    ],
  }
})
