import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    port: 3000,
    cors: true, // 允许跨域
    proxy: {
      // 配置代理
      "/api": {
        target: "http://api.localhost.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
