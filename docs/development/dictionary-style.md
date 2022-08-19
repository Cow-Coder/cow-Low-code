# 目录/命名规范

由于我们没有找到类似 `Airbnb JavaScript Style` 这类高质量的目录规范。所以我们根据自己的调研结果整理出来了一套适用于本项目的目录规范

::: info 提示
详细的调研结果请参阅：https://cw39gvucrn.feishu.cn/docx/doxcnU18YY3qxxDvScQuHEPiUvd

这里是示例，可以帮助您更好的理解：https://boardmix.cn/app/editor/Wldc0peQxM_G5R7Z_M9VMQ
:::

## 组件文件名

中划线

> [单文件组件文件的大小写](https://v2.cn.vuejs.org/v2/style-guide/index.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E5%90%8D%E7%9A%84%E5%A4%A7%E5%B0%8F%E5%86%99%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
>
> 官方描述是`大驼峰`和`中划线`二选一

## 组件目录结构

```text
├─组件名
│ ├─components
│ │ ├─单文件组件.vue
│ │ ├─单文件组件.vue
│ ├─index.vue
```

## 全局 css、css 变量位置

```text
/src/asset/style
```

## 全局 css 变量文件名

```text
/src/asset/style/xxx.scss
```

## 组件内 style、hooks、types 等位置

```text
.
├─index.vue/index.tsx
├─index.module.less
├─other.less
```

## hook 文件名

中划线

## 全局 hook 目录结构

```text
/src/hooks
├─use-xxx.ts
```

## 项目全局常量位置

```
/src/constants
```

## 项目全局类型声明文件 d.ts 位置

```
/types
```

## 项目全局类型定义文件位置

```
/src/types
```

## 子组件(二级组件、三级组件以及其他后代组件)位置

平铺型(除非该组件还有附带 css，或者子组件)

```
├─组件名
│ ├─components
│ │ ├─单文件组件.vue
│ │ ├─单文件组件.vue
│ ├─index.vue
```

## interface 和 type 变量名是否加前后缀

❌

## enum 变量名是否带后缀

✅

## interface 和 type 名称命名

大驼峰

## 组件内工具函数文件命名(未调研)

[util.ts](https://pro.ant.design/zh-CN/docs/folder#:~:text=%7C%20%20%20%E2%94%94%E2%94%80%E2%94%80-,util.ts,-//%20%E8%BF%99%E9%87%8C%E5%8F%AF%E4%BB%A5%E6%9C%89)

## 组件分组(未调研)

分类文件夹下不得有裸露的组件，可以有统一导出文件`index.ts`，必须用文件夹包裹。同等于[一级组件](https://cw39gvucrn.feishu.cn/docx/doxcnU18YY3qxxDvScQuHEPiUvd#doxcnJ7d7uW5YKUIRjGt4y1sELf)

```
library
 ├── generic
 │   ├── input
 │   │   └── button
 │   │       └── index.vue
 │   └── show
 │       ├── image
 │       │   └── index.vue
 │       └── swipe
 │           ├── components
 │           └── index.vue
 └── index.ts
```

## 组件名、文件夹名称哪些单词可以缩写

- 组件名任何情况下不得缩写，参考[完整单词的组件名强烈推荐](https://v2.cn.vuejs.org/v2/style-guide/#%E5%AE%8C%E6%95%B4%E5%8D%95%E8%AF%8D%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- 文件夹名称任何情况下不得缩写
