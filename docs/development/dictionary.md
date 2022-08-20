# 文件夹结构

牛搭采用 `monorepo` 架构实现物料组件（libraryComponent）和动作处理器（actionHander）在编辑器（editor）和预览模块（preview）等多个包之间共用

## 概览

```text
cow-Low-code
├── .husky # git钩子
│   ├── _
│   ├── commit-msg # 校验commit msg规范
│   └── pre-commit # 校验&格式化代码
├── .vscode # vscode预设
│   ├── extensions.json
│   └── settings.json
├── docs # 项目文档
├── internal # 内部package
│   ├── build-utils # 构建工具
│   ├── vite-plugin-monaco-editor-nls # monaco-editor 汉化插件
│   └── vscode-language-pack-zh-hans # monaco-editor 中文语言包插件
├── packages # 项目主要package
│   ├── constant # 全局常量
│   ├── editor # 页面编辑器
│   ├── event-action # 事件动作执行器
│   ├── library # 物料组件库
│   ├── preview # 预览模块
│   ├── types # 全局类型定义
│   └── utils # 全局工具库
├── .editorconfig # IDE编辑器选项预设
├── .eslintignore # eslint 忽略规则
├── .eslintrc.cjs # eslint 配置
├── .npmrc # pnpm 配置
├── .prettierignore # prettier 忽略规则
├── .prettierrc.cjs # prettier 配置
├── LICENSE
├── README.md
├── commitlint.config.js # commit lint 配置
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml # monorepo 工作空间配置
```

## packages/constant

全局常量

```text
constant
├── src
│   └── index.ts # 常量
└── package.json # 每一个包都必须包含该文件
```

## packages/editor

页面编辑器

```text
editor
├── config # editor 项目配置文件
│   ├── plugins # vite 插件
│   ├── vite.config.base.ts # 基础 vite 配置
│   ├── vite.config.dev.ts # 开发环境 vite 配置
│   └── vite.config.prod.ts # 生产环境 vite 配置
├── public
│   └── icon.svg
├── src
│   ├── assets # 静态资源/全局样式
│   ├── components # 通用组件
│   ├── constant # 全局常量
│   ├── directive # 全局自定义指令
│   ├── hooks # 全局组合式函数
│   ├── library # 导入 packages/library
│   ├── plugins # 项目用到的npm包，直接写在main.ts不方便，就放这里
│   ├── router # 路由
│   ├── stores # pinia store
│   ├── types # editor 类型定义
│   ├── utils # 工具库
│   ├── views # 业务页面入口
│   ├── App.vue
│   └── main.ts
├── types # editor 类型声明
│   ├── auto-imports.d.ts # unplugin-auto-import 自动生成
│   ├── color-picker.d.ts # color-picker-v3 类型声明
│   ├── components.d.ts # unplugin-vue-components 自动生成
│   ├── env.d.ts # vite/client 类型声明
│   └── global.d.ts # 其他全局类型声明
├── index.html # 入口文件
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js # 服务于 tailwind
├── stats.html # rollup-plugin-visualizer 打包大小分析
├── tailwind.config.js # tailwind 配置文件
├── tsconfig.config.json # node 环境typescript配置
└── tsconfig.json # web 环境typescript配置
```

## packages/event-action

事件动作执行器

```text
event-action
├── src
│   ├── actions # 触发器
│   │   ├── component # 组件类触发器
│   │   ├── other # 其他类别触发器
│   │   ├── page # 页面类触发器
│   │   └── service # 服务类触发器
│   └── utils # 工具库
│       └── util.ts
├── types # 类型声明
│   └── env.d.ts # vite/client 类型声明
├── index.ts
├── package.json
└── tsconfig.json # web 环境typescript配置
```

## packages/library

物料组件库

```text
library
├── src
│   ├── components # 物料组件
│   │   ├── business # 业务组件 分类 对应于 editor 业务组件 tab
│   │   │   └── show # 展示 小类 对应于 editor 业务组件 tab 下的 show collapse
│   │   │       └── swipe # 幻灯片
│   │   └── generic # 通用组件 分类
│   │       ├── input # 表单 小类
│   │       │   ├── button # 按钮
│   │       │   │   └── index.vue # 按钮组件入口
│   │       │   └── textbox # 文本框
│   │       │       └── index.vue
│   │       └── show # 展示 小类
│   │           ├── collapse # 折叠面板
│   │           │   ├── components # 子组件
│   │           │   │   └── preview.vue
│   │           │   └── index.vue # 组件入口
│   │           ├── image # 图片
│   │           │   └── index.vue
│   │           ├── notice-bar # 通知栏
│   │           │   └── index.vue
│   │           └── swipe # 轮播图
│   │               ├── components # 子组件
│   │               │   └── preview.vue
│   │               └── index.vue # 入口
│   ├── hooks # 组合式函数
│   │   ├── use-library-component-custom-trigger.ts
│   │   └── use-multi-click.ts
│   └── utils # 工具库
│       └── library.ts
├── types # 类型声明
│   └── env.d.ts
├── index.ts # 物料组件库入口文件
├── package.json
├── tsconfig.config.json # node 环境typescript配置
└── tsconfig.json # web 环境typescript配置
```

## packages/preview

预览模块

文件夹结构同 `packages/editor` 这里不再赘述

```text
preview
├── config
│   ├── plugins
│   ├── vite.config.base.ts
│   ├── vite.config.dev.ts
│   └── vite.config.prod.ts
├── src
│   ├── plugins
│   ├── router
│   ├── stores
│   ├── views
│   ├── App.vue
│   └── main.ts
├── types
│   ├── auto-imports.d.ts
│   ├── components.d.ts
│   └── env.d.ts
├── index.html
├── package.json
├── tsconfig.config.json
└── tsconfig.json
```

## packages/types

全局类型定义

```text
types
├── src
│   ├── action.ts # 动作处理器 相关类型定义
│   ├── event-trigger.ts # 事件触发器 相关类型定义
│   ├── library-component.ts # 物料组件 相关类型定义
│   ├── panel.ts # 操作面板/设置器 相关类型定义
│   └── util.ts # 工具库 相关类型定义
├── index.ts # 入口文件
├── package.json
└── tsconfig.json # web 环境typescript配置
```

## packages/utils

全局工具库

```
utils
├── src
│   ├── action.ts # 动作处理器 工具库
│   └── library.ts # 物料组件 工具库
├── index.ts # 入口文件
└── package.json
```

## internal/build-utils

构建工具，用于定位构建输出目录

```text
build-utils
├── src
│   ├── index.ts # 构建工具入口文件
│   └── paths.ts # 打包输出路径配置
├── build.config.ts # unbuild 打包工具配置文件
├── package.json
└── tsconfig.json # node 环境typescript配置
```

## internal/vite-plugin-monaco-editor-nls

monaco-editor i18n 插件，自行修复维护，不依赖原作者

```text
vite-plugin-monaco-editor-nls
├── src
│   ├── locale # 旧版语言包
│   └── index.ts # 插件入口 & 核心
├── README.md
├── package.json
└── tsconfig.json
```

## internal/vscode-language-pack-zh-hans

由于没有适用于 vite 的 monaco-editor 相关语言包作为 npm 包单独发布

所以这里直接将语言包内置于项目之中，随时同步官方 [vscode-loc](https://github.com/microsoft/vscode-loc)
