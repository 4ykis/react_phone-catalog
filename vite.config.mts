import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'

const breakpoints = path
  .resolve(__dirname, 'src/assets/styles/breakpoints')
  .split(path.sep)
  .join('/')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Makes breakpoint mixins (up/down/between) global in every scss file
        additionalData: `@use "${breakpoints}" as *;\n`,
      },
    },
  },
})
