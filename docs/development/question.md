# 常见问题

## 为什么在本地没有按需引入组件库样式，在生产才引入

在 main.ts 内可以看到，本地开发会全量引入 antd.less，vite-plugin-style-import 在本地是没有作用的。

这样做的原因主要是加快本地开发刷新速度。如果在本地开发中也按需按需引入，则在浏览器控制台内可以看到，平均一个页面大概增加了 100 次 http 请求。如果全量引入，只增加了一个请求，所以为了减少请求数量，才这样做。

```typescript
// src/main.ts
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

// build/vite/plugin/styleImport
import styleImport from 'vite-plugin-style-import'
export function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) return []
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        },
      },
    ],
  })
  return styleImportPlugin
}
```
