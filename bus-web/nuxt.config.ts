// https://v3.nuxtjs.org/api/configuration/nuxt.config
import {defineNuxtConfig} from "nuxt";
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
    vite: {
        plugins: [
        ],
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3060',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
            }
        },
    },
})
