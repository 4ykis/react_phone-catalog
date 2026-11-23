import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'

const stylesDir = path
  .resolve(__dirname, 'src/assets/styles')
  .split(path.sep)
  .join('/')

// Partials whose mixins/variables must be available in every .scss file
const globalScss = ['breakpoints', 'utils']

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Makes all mixins from assets/styles global in every scss file
        additionalData: `${globalScss
          .map(name => `@use "${stylesDir}/${name}" as *;`)
          .join('\n')}\n`,
      },
    },
  },
})
