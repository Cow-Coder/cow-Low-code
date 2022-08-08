import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'

export default function configElementStyleAndIcon() {
  return [
    /**
     * 1. 为 Element Plus 按需引入样式
     * 2. 替换默认语言
     *
     * 解决手动导入时候需要额外导入组件样式的问题
     * @link https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%89%8B%E5%8A%A8%E5%AF%BC%E5%85%A5
     */
    ElementPlus({
      defaultLocale: 'zh-cn',
    }),
    /**
     * 自动注册 @iconify-json/ep
     * 并不会自动导入，自动导入是unplugin-vue-components的事情
     */
    Icons({
      /**
       * expiremental
       * @link https://github.com/antfu/unplugin-icons#install-by-icon-set
       * @link https://github.com/sxzz/element-plus-best-practices/blob/db2dfc983ccda5570033a0ac608a1bd9d9a7f658/vite.config.ts#L56
       */
      autoInstall: true,
    }),
  ]
}
