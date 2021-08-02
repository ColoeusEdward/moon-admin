import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import define from './src/utils/define'


export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/moon-admin/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [vue(), vueJsx()]
  , server: {
    port: 3333
    , open: false
  }
  , build: process.env.NODE_ENV === 'production' ? {} : {
    rollupOptions: {
      output: {
        sourcemap: true
      }
    }
  }
})
