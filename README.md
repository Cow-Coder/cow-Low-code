# cow_code-Low-Code

# TODO

- [ ] 属性面板左右拖动

# 目录结构

```
cow-Low-code
├── public
│   └── favicon.ico
├── src
├── README.md
├── auto-imports.d.ts 			# 自动导入API https://github.com/antfu/unplugin-auto-import#configuration
├── commitlint.config.js
├── components.d.ts				# 自动导入组件
├── env.d.ts
├── global.d.ts					# 自行定义的
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js			# tailwindcss
├── stats.html					# rollup-plugin-visualizer https://github.com/btd/rollup-plugin-visualizer
├── tailwind.config.js			# tailwindcss
├── tsconfig.config.json
├── tsconfig.json
└── vite.config.ts
```

`src` 目录

```
src
├── assets
│   ├── preflight.css			# 影响element-plus按钮颜色而导入的
│   └── tailwind.css			# tailwind 默认配置
├── components
│   ├── attributePanel
│   │   ├── components
│   │   ├── config.ts
│   │   ├── index.vue
│   │   └── library-component.ts
│   ├── codePanel
│   │   └── index.vue
│   ├── editPanel
│   │   ├── index.vue
│   │   └── library-component.ts
│   └── libraryPanel
│       ├── genericsLib
│       ├── library-component.ts
│       ├── libraryPanelBase.vue
│       └── library-component.ts
├── hooks						#
│   └── use-v-model-by-computed.ts
├── library						# 物料组件库
│   ├── button					# 物料组件名
│   │   └── index.vue			# Lib + 物料组件名
│   ├── image
│   │   └── index.vue			# 自动识别index.vue或者index.tsx为组件
│   ├── swipe
│   │   ├── index.vue
│   │   └── preview.tsx
│   ├── library-component.ts				# library入口文件
│   └── library-component.ts
├── router
│   └── library-component.ts
├── stores
│   ├── plugins
│   │   └── store-reset.ts		# https://seb-l.github.io/pinia-plugin-persist/
│   └── code.ts					# store
├── utils
│   └── library.ts				# 工具函数
├── views
│   └── HomeView.vue
├── App.vue
└── main.ts
```
