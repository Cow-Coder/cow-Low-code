# 开发物料组件

在开发之前首先需要确认组件的定位，是属于 `通用组件` 还是 `业务组件` 亦或是其他大类。

再次要确定其小类，也就是属于 `表单` 还是 `展示` 还是其他小类。其对应关系如下

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5d22avtuyj30dc0a1my4.jpg' />

大致目录结构请参阅：[packages/event-action](/development/dictionary.html#packages-library)

这里我们以 `通用组件` -> `展示` 中的 `按钮` 物料组件为例进行说明讲解

## 开始

牛搭采用的是 `monorepo` 架构来处理预览模块和 editor 共用物料组件的文件。在 `packages` 下的每一个目录都是一个单独的 npm 包。

::: warning 注意
并不是 `packages/*` 下的每一个包都能够单独发布。

如 `packages/event-action` 就只能被使用了 vite 的包(如 `packages/editor` )进行导入使用
:::

根据上述说明的组件定位，现在进入 `packages\library\src\components\generic\input\button` 文件夹，这里就是存放 `button` 物料组件的位置

请注意，这里文件的存放方式。根据规范，需要按照如下要求进行存放

```text
input
├── button
│   └── index.vue
└── textbox
    └── index.vue
```

::: danger 警告
**不能**像这样，将物料组件平铺在目录下

```text
input
├── button.vue
└── textbox.vue
```

:::

## 最简示例

在这里您可以选择使用 `.vue` 或者 `.tsx`，这里以 `.vue` 为例

一个最简单的物料看起来是这样的：

```vue
<template>
  <div class="wiget-button">
    <van-button>按钮</van-button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'WidgetButton',
}
</script>

<style lang="scss" scoped>
.wiget-button {
  // tailwind 样式
  @apply w-full;
}
</style>
```

请观察上面的代码，与开发中后台时候的组件有什么异同？

是的，并没有什么不同，这里开发与中后台的开发十分相似。只不过多了一些配置选项，下面我们一一进行讲解。

## 导出对象

下面是这个 button 物料组件 `<script>` 块中的简化

我们规定：

- 每一个物料组件都必须写 `name` 字段，并且所有物料组件都必须以 `Widget` 开头
- 物料组件的相关信息定义需要调用 `defineLibraryComponent` 函数，然后对其返回值进行解构
- `props` 写在 `defineComponent` 的对象中，并且每一项定义都需要调用 `createLibraryComponentPropItem` 函数

其他信息请参考下面的图片和代码

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5d2yps6zcj30gk03v3z7.jpg' />

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5d37oead4j30an02s3yj.jpg' />

```typescript
export default defineComponent({
  ...defineLibraryComponent({
    // 组件名称
    name: 'WidgetButton',
    // 所处大类，这里是 `通用组件`
    libraryName: LibraryPanelTabEnum.generics,
    // 所属小类，这里是 `展示`
    tabName: 'show',
    // 在小类中的排序
    order: 1,
    // 在面板中显示的提示信息
    libraryPanelShowDetail: {
      title: '按钮',
      // 左侧的图标组件
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-aim />
          </ElIcon>
        </>
      ),
    },
    // 提示信息 & 组件预览
    tips: {
      // 预览标题
      title: '按钮',
      // 预览描述
      desc: '用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为。',
      // 右侧的预览组件，这里使用的是函数式组件
      // 如果该图标组件您需要使用其生命周期功能
      // 那么可以使用 defineComponent 再定义一个组件
      // 并放置在和 `index.vue` 同级目录下
      // 再将其导入并使用于此处
      preview: () => (
        <>
          <Button>按钮jsx</Button>
          <Button type="primary">按钮jsx</Button>
          <Button type="success" plain>
            按钮jsx
          </Button>
        </>
      ),
    },
  }),
  props: {
    // props 每一项都需要调用 createLibraryComponentPropItem 函数
    title: createLibraryComponentPropItem({
      // 显示在属性面板的设置名称
      title: '按钮名称',
      // 默认值，同 props 的默认值
      default: '按钮',
      // 属性面板应该展示哪种表单类型
      formType: AttributePanelFormItemInputTypeEnum.input,
      // 应该在属性面板的哪个 tab 中
      belongToPanel: AttributePanelsEnum.generic,
    }),
  },
  setup(props, { emit }) {},
})
```

## 完善组件功能

一个按钮，我们期待的是它能够响应响应我们的点击操作。不过响应事件的并不一定是按钮自身。所以确保物料组件自身只是 `事件的发送者` a.k.a. `事件触发器`

通过下面的例子您就能明白

::: info 信息
很常见的一个功能是：

1. 点击按钮，触发 click
2. 页面中的其他组件响应操作，比如轮播图切换下一页
   :::

```vue
<template>
  <div>
    <van-button @click="onClick" @dblclick="ondblClick">按钮</van-button>
  </div>
</template>

<script lang="tsx">
enum EventTriggersEnum {
  click = 'click',
  doubleClick = 'doubleClick',
}

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetButton',
    // 其他配置...

    // 声明该物料组件存在的事件触发器
    eventTriggers: {
      // 组件上 事件触发器的唯一标识符
      // 这里我们强烈推荐您使用枚举作为键值
      [EventTriggersEnum.click]: {
        // 对该事件的描述
        title: '点击',
      },
      [EventTriggersEnum.doubleClick]: {
        title: '双击',
      },
    },
  }),
  // 其他配置...

  /**
   * 所有物料组件触发事件都用 `dispatchEvent`
   * `CUSTOM_EVENT_EMIT_NAME` 是一个全局常量
   * 其值为 `dispatchEvent`
   */
  emits: [CUSTOM_EVENT_EMIT_NAME],
  setup(props, { emit }) {
    function onClick() {
      // 激活 单击事件
      // 至于谁来执行，这里不需要物料组件关系
      emit(CUSTOM_EVENT_EMIT_NAME, 'click')
    }
    function ondblClick() {
      // 激活 双击事件
      emit(CUSTOM_EVENT_EMIT_NAME, 'doubleClick')
    }
    return {
      onClick,
      ondblClick,
    }
  },
})
</script>
```

::: tip 结束
Congratulation！您已经掌握编写物料组件的基本方法，开始向丛林跟深处进发吧！
:::
