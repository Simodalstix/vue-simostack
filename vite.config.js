import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/', // Ensures asset paths are root-relative (not ./ or /dist/)
  build: {
    outDir: 'dist', // Default is 'dist', but it's good to be explicit
    emptyOutDir: true, // Clears old build artifacts
  },
})
