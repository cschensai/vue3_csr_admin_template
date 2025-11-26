import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

// 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// 打包分析
import { visualizer } from "rollup-plugin-visualizer";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取环境变量
  const envObj = loadEnv(mode, process.cwd());
  // 是否开启打包分析
  const isAnalyze = envObj.VITE_ANALYZE === 'true';
  // 打包分析插件
  return {
    server: {
      hmr: true,
      port: 8080,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "https://staging.fpfe.app",
          changeOrigin: true,
          rewrite: (url: string) => url.replace(/^\/api/, ""),
        }
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      svgLoader(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
  
        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
  
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: "i"
          })
        ],
        dts: path.join(".", "auto-imports.d.ts")
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"], // 使用比如<i-ep-elementplus的图库名 />
          }),
          ElementPlusResolver()
        ],
        dts: path.join(".", "components.d.ts")
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3'
      }),
      isAnalyze &&
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "dist/stats.html",
        }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              __dirname,
              "src/common/less/common.less"
            )}";`,
            javascriptEnabled: 'true'
          } as Record<string, string>
        }
      },
      modules: false,
    },
    build: {
      // 为了适配nginx上的处理
      // assetsDir: "template",
      rollupOptions: {
        output: {
          entryFileNames: "js/[name]-[hash].js",
          chunkFileNames: "js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name?.split(".").pop();
            if (extType && /css/i.test(extType)) {
              return "css/[name]-[hash].[ext]";
            }
            if (extType && /(png|jpe?g|gif|svg|webp|avif)/i.test(extType)) {
              return "img/[name]-[hash].[ext]";
            }
            if (extType && /(woff2?|eot|ttf|otf)/i.test(extType)) {
              return "font/[name]-[hash].[ext]";
            }
            return 'assets/[name]-[hash].[ext]';
          },
        },
      },
    }
  }
});

