import { defineConfig } from 'vite'
import * as path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
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
		createVuePlugin(),
		Components({
			resolvers: [
				VuetifyResolver(),
			],
		}),
	],

	server: {
    port: 8080,
    /** Backup proxy to use for payment gateway */
    // proxy: {
    //   '^/api': {
    //     target: 'http://127.0.0.1:5000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
	},
})
