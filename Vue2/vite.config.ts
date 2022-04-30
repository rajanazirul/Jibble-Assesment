import { defineConfig } from 'vite'
import * as path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
    dedupe: ['vue-demi'],
  },

  build: {
    minify: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^x-/.test(tag)
        }
      }
    }),
    createVuePlugin(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
    }),
  ],

  server: {
    port: 8080,
  },
})
