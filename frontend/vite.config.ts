import path from "path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      // 포트 번호 설정
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_BASE_SERVER_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[ext]",
          chunkFileNames: "js/[name]-[hash].js",
          manualChunks: {
            vendor: [
              //
              "react",
              "react-dom",
              "react-router-dom",
              "lucide-react",
              "axios",
              "framer-motion",
              "tailwind-merge",
              "tailwindcss",
              "zustand",
            ],
          },
        },
      },
    },
  }
})
