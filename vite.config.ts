import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import define from './src/utils/define'
import fs from "fs";
import { join, resolve, extname, dirname } from "path";
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

const timeStamp = new Date().getTime()
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? define.root : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/')
    }
  },
  plugins: [vue(), vueJsx(),
    , chunkSplitPlugin({
      // 指定拆包策略
      customSplitting: {
        // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的依赖，如 object-assign)
        'vue-vendor': ['vue','vue-router',/^.*vueuse.*$/, 'pinia','vue3-grid-layout'],
        'naiveui-vendor': ['naive-ui'],
        'echarts-vendor': [/^.*echarts.*$/],
        // 'v8-verndor':[/src\/views\/v8/],
        // 'dash-verndor':[/src\/views\/dash/],
        // 'layout-verndor':[/src\/layouts/],
        // 'store-verndor':[/src\/store/]
        // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
        // 'components-util-view': [/src\/components/, /src\/utils/,/src\/views/,/src\/router/,/src\/bookPage/,/src\/layouts/,/src\/directive/,/src\/apis/,/src\/settings/,/src\/store/,/src\/styles/]
      }
    })
  ]
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
      cssCodeSplit:false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          book: resolve(__dirname, 'bookPage/index.html')
        }
        // , output: {
        //   manualChunks(id, { getModuleInfo }) {
        //     if (id.includes('node_modules') && id.includes('naive-ui')) {
        //       return 'naive-ui'
        //     }
        //     if (id.includes('node_modules') && id.includes('echarts')) {
        //       return 'echarts'
        //     }
        //     if (id.includes('node_modules') && id.includes('vue')) {
        //       return 'vue'
        //     }
        //     if (id.includes('node_modules')) {
        //       return 'vendor'
        //     }
        //     // if (id.includes("node_modules")) {
        //     //   const [, module] = /node_modules\/(@?[a-z0-9-]+?[a-z0-9-]+)/.exec(
        //     //     id
        //     //   );
        //     //   const path = join(
        //     //     process.cwd(),
        //     //     "node_modules",
        //     //     module,
        //     //     "package.json"
        //     //   );
        //     //   if (fs.existsSync(path)) {
        //     //     try {
        //     //       const packageJson = require(path);
        //     //       const version = packageJson.version;
        //     //       return `@vendor/${module}_${version}.js`;
        //     //     } catch (error) {}
        //     //   }
        //     // }
        //   }
        // }
      }
      , chunkSizeWarningLimit: 600
    } : {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          book: resolve(__dirname, 'bookPage/index.html')
        }
        , output: {
          sourcemap: true
        }
      }
    }
  , define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV
    }
  }
  , css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }

})
