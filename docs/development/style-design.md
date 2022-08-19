# 样式

## 介绍

主要介绍如何在项目中使用和规划样式文件。

默认使用 scss 作为预处理语言，建议在使用前或者遇到疑问时学习一下 [Scss](https://sass-lang.com/) 的相关特性（如果想获取基础的 CSS 知识或查阅属性，请参考 MDN 文档）。

一般项目中使用的通用样式，都存放于 `src/assets/style` 下面。

```text
cow-Low-code/packages/editor/src/assets/style
├── global.scss # 全局通用样式
├── popover.module.scss # arco design vue中popover模块通用样式
├── preflight.css # 覆盖tailwind的preflight样式
└── tailwind.css # tailwind默认样式
```

:::tip 全局注入
global.scss 这个文件会被全局注入到所有文件，所以在页面内可以直接使用变量而不需要手动引入
:::

```vue
<style lang="scss" scoped>
// 这里已经隐式注入了 global.scss
</style>
```

## tailwindcss

项目中引用到了 [tailwindcss](https://tailwindcss.com/docs),具体可以见文件使用说明。

语法如下:

```html
<div class="flex flex-col flex-grow w-full px-4"></div>
```

## 为什么使用 Scss

因为 Element Plus 使用 Scss 作为样式语言，使用 Scss 可以跟其保持一致。

## 深度选择器

有时我们可能想将样式作用于组件库的组件上。

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `:deep()` 操作符

使用 scoped 后，父组件的样式将不会渗透到子组件中，所以可以使用以下方式解决：

```vue
<style scoped>
:deep(.foo) {
}
</style>
```

## CSS Modules

针对样式覆盖问题，还有一种方案是使用 CSS Modules 模块化方案。使用方式如下。

```vue
<template>
  <span :class="$style.span1">hello</span>
</template>

<script>
import { useCSSModule } from 'vue'

export default {
  setup(props, context) {
    const $style = useCSSModule()
    const moduleAStyle = useCSSModule('moduleA')
    return {
      $style,
      moduleAStyle,
    }
  },
}
</script>

<style lang="less" module>
.span1 {
  color: green;
  font-size: 30px;
}
</style>

<style lang="less" module="moduleA">
.span1 {
  color: green;
  font-size: 30px;
}
</style>
```
