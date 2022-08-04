import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Inspect from "vite-plugin-inspect";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

import { manualChunksPlugin } from "vite-plugin-webpackchunkname";

import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // /**
    //  * vite的webpackChunkName实现
    //  * @link https://github.com/rollup/rollup/issues/4283#issuecomment-1202949560
    //  */
    // manualChunksPlugin(),
    vue(),
    vueJsx(),
    /**
     * 自动导入API
     * @link https://github.com/antfu/unplugin-auto-import#configuration
     */
    AutoImport({
      /**
       * 预设 presets
       * @link https://github.com/antfu/unplugin-auto-import/tree/main/src/presets
       */
      imports: [
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        "vue",
        "@vueuse/core",
        "pinia",
      ],
      /**
       * @link https://github.com/antfu/unplugin-auto-import#eslint
       */
      eslintrc: {
        enabled: true,
      },
      // vueTemplate: true,
      resolvers: [
        /**
         * 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
         * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L27
         */
        ElementPlusResolver(),
        /**
         * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L33
         */
        IconsResolver(),
      ],
    }),
    /**
     * 自动导入组件
     */
    Components({
      resolvers: [
        ElementPlusResolver(),
        /**
         * TODO: 自动导入ICON没有弄清效果
         * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L45
         */
        IconsResolver(),
        VantResolver(),
      ],
    }),
    /**
     * 1. 为 Element Plus 按需引入样式
     * 2. 替换默认语言
     * @link https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%89%8B%E5%8A%A8%E5%AF%BC%E5%85%A5
     */
    ElementPlus({
      defaultLocale: "zh-cn",
    }),
    Icons({
      /**
       * expiremental
       * @link https://github.com/antfu/unplugin-icons#install-by-icon-set
       * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L56
       */
      autoInstall: true,
    }),
    Inspect(),
    /**
     * @link https://github.com/btd/rollup-plugin-visualizer#options
     */
    visualizer({
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          editor: ["monaco-editor"],
        },
      },
    },
  },
});
