import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import define from './src/utils/define'
import fs from "fs";
import { join,resolve } from "path";


export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? define.root : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/')
    }
  },
  plugins: [vue(), vueJsx()]
  , server: {
    fs: {
      // 可以为项目根目录的上一级提供服务
      allow: ['.']
    },
    port: 3333
    , open: false
  }
  , build: process.env.NODE_ENV === 'production' ?
    {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          book: resolve(__dirname, 'bookPage/index.html')
        }
        ,output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const [, module] = /node_modules\/(@?[a-z0-9-]+?[a-z0-9-]+)/.exec(
                id
              );
              const path = join(
                process.cwd(),
                "node_modules",
                module,
                "package.json"
              );
              if (fs.existsSync(path)) {
                try {
                  const packageJson = require(path);
                  const version = packageJson.version;
                  // console.log(module, version);
                  return `@vendor/${module}_${version}.js`;
                } catch (error) {}
              }
            }
          }
        }
      }
      ,chunkSizeWarningLimit:600
    } : {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          book: resolve(__dirname, 'bookPage/index.html')
        }
        ,output: {
          sourcemap: true
        }
      }
    }
  , define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV
    }
  }
  ,css:{
    modules:{
      localsConvention:'camelCaseOnly'
    }
  }
})
