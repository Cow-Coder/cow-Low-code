# 图标

牛搭整个项目都是优先使用一套风格的图标 -- [IconPark](https://iconpark.oceanengine.com/home)

当然也提供了 Element Plus 官方的 SVG 图标。

::: warning 注意
Element Plus 的图标最好只用在其组件自身上，其他地方一律使用 IconPark 提供的图标
:::

## 使用 Element Plus 图标

使用方式很简单，你只需进入 Element Plus 图标 页面，然后点击需要使用的图标，复制图标名称 并修改为 `i-ep-xxx` 即可使用了。

```vue
<script setup></script>

<template>
  <el-icon>
    <i-ep-arrow-right />
  </el-icon>
</template>
```

不过这种自动导入的方式仅限于 Vue 文件中。如果要在 TSX 文件中使用，请先导入。

```tsx
// IconArrowRight 导入名称是自定义的
import IconArrowRight from '~icon/ep/arrow-right'

export default defineComponent({
  setup() {
    return (
      <>
        <div class="my-icon">
          <IconArrowRight />
        </div>
      </>
    )
  },
})
```

::: info 信息
要了解更多，请参阅：[unplugin-icons](https://github.com/antfu/unplugin-icons#usage)
:::
