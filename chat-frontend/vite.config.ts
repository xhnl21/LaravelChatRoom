import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    origin: 'http://10.1.12.18:8081',
    port: 8081,
    cors: true,
    // headers: {
    //   "Content-type": "application/json",
    //   "Accept": "application/json, text/plain, */*",
    //   "Access-Control-Allow-Origin": "*",
    //   'Access-Control-Allow-Methods': 'GET, POST`, PUT, PATCH, DELETE',
    //   "X-Requested-With": "XMLHttpRequest",
    // },
    // cors: {
    //   origin: "http://10.1.12.18:8081",
    //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    //   allowedHeaders: ["Content-Type", "Authorization"],
    //   preflightContinue: true
    // },
    proxy: {
      // '/api': {
      //   target: 'http://10.1.12.18:8081',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:8080',
      //   ws: true,
      // },
    },
    // hmr: {
    //   host: "localhost",
    //   protocol: "ws",
    // },
  },
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
