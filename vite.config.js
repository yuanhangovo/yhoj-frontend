import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        open: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // 后端API地址
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, 'src'),
        },
    },
    plugins: [react()],
})
