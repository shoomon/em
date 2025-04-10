import path from "path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { compression } from "vite-plugin-compression2"
import imagemin from "vite-plugin-imagemin"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      compression({
        algorithm: "gzip",
        compressionOptions: {
          level: 9, // 최대 압축 수준
        },
        include: ["**/*.{js,css,html}"],
      }),
      compression({
        algorithm: "brotliCompress",
        include: ["**/*.{js,css,html}"],
      }),
      imagemin({
        gifsicle: false,
        optipng: {
          optimizationLevel: 3,
        },
        webp: {
          quality: 80,
        },
        svgo: {
          plugins: [
            { name: "removeViewBox", active: false },
            { name: "removeEmptyAttrs", active: false },
            { name: "cleanupIDs", active: false },
            { name: "collapseGroups", active: false },
          ],
        },
      }),
      // VitePWA({
      //   registerType: "autoUpdate",
      //   includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      //   manifest: {
      //     name: "이음(EM)",
      //     short_name: "이음",
      //     description: "지금 여기, 감정의 순간을 기록하다",
      //     theme_color: "#fafafa",
      //     // icons: [
      //     //   {
      //     //     src: "/icons/icon-192x192.png",
      //     //     sizes: "192x192",
      //     //     type: "image/png",
      //     //   },
      //     // ],
      //   },
      // }),
    ],
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
          rewrite: (path) => {
            if (env.VITE_BASE_SERVER_URL.includes("localhost")) {
              return path.replace(/^\/api/, "")
            }
            return path
          },
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000, // 경고 한계치를 1000KB로 설정
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name].[ext]",
          chunkFileNames: "js/[name]-[hash].js",
          manualChunks(id) {
            // node_modules를 vendor chunk로 분리
            if (id.includes("node_modules")) {
              // 큰 라이브러리들을 별도의 청크로 분리
              if (id.includes("react")) {
                return "vendor-react"
              }
              if (id.includes("react-dom")) {
                return "vendor-react-dom"
              }
              if (id.includes("axios")) {
                return "vendor-axios"
              }
              if (id.includes("tailwindcss")) {
                return "vendor-tailwind"
              }
              return "vendor"
            }

            // 라우트 기반 코드 스플리팅
            if (id.includes("/src/pages/")) {
              const pageName = id.split("/src/pages/")[1].split("/")[0]
              return `page-${pageName}`
            }

            // 공통 컴포넌트 분리
            if (id.includes("/src/components/")) {
              return "components"
            }

            // Feature 기반 코드 스플리팅
            if (id.includes("/src/features/")) {
              const featureName = id.split("/src/features/")[1].split("/")[0]
              return `feature-${featureName}`
            }
          },
        },
      },
      // 프로덕션 모드에서만 Terser 사용 (불필요한 코드 최소화)
      minify: mode === "production" ? "terser" : false,
      terserOptions: {
        compress: {
          drop_console: true, // 콘솔 로그 제거
          drop_debugger: true, // 디버거 제거
          pure_funcs: ["console.log", "console.info"], // 순수 함수 제거
          passes: 2, // 최적화 패스 수
        },
        mangle: {
          toplevel: true, // 최상위 변수 이름 축소
        },
      },
      reportCompressedSize: true, // 압축 크기 리포트 활성화
    },
  }
})
