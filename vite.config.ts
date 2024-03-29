import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import babel from 'vite-plugin-babel'

import qiankun from 'vite-plugin-qiankun'

import replace from '@rollup/plugin-replace'

const useDevMode = true
import { name } from './package.json'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : `/micro/${name}/`,
  plugins: [
    replace({
      values: {
        'a-': 'b-',
      },
      exclude: ['./src/**'],
    }),
    babel(),
    vue2(),
    vue2Jsx(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // 这里的 'vue2-vite' 是子应用名，主应用注册时AppName需保持一致
    qiankun(name, {
      useDevMode,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
