# 开发动作执行器

`动作执行器` 是处于一个单独的 npm 包中，其位置在 `packages\event-action`

大致目录结构请参阅：[packages/event-action](/development/dictionary.html#packages-event-action)

::: details 细节
该 npm 包无法单独打包发布，只能被使用了 vite 的其他包导入使用
:::

::: tip 提示
由于动作执行器其特殊性，只能采用 `tsx` 进行开发
:::

上篇说了实现一个 `按钮` 物料组件

这里我们实现如下场景

- 点击按钮
- 打开配置好的指定页面

具体配置如下

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5d49dkcn9j30mo0g0tak.jpg' />

## 动作执行器定位

由于我们是希望现在开发的这个 action 能够打开指定的页面，故其应该属于页面相关的动作执行器，应该应该放置在 `packages\event-action\src\actions\page`

暂且取名为 `OpenPage`，此时对应的目录名应为 `open-page`

目录结构如下

```text
page
├── open-page # OpenPage动作执行器
│   └── index.tsx
└── index.tsx # 动作执行器 page 分类的相关配置
```

## 提供动作执行器的配置页面

首先，我们动作执行是可以的配置的对吧。打开哪个链接呢？是新窗口打开还是本窗口打开呢？

这些属于我们的配置参数，我们可以将其定义为一个自定义 `type`

```ts
type JumpLinkConfig = {
  url: string
  blank: boolean
}
```

接下来我们需要定义 action 本体，并提供相应的可配置界面

```tsx
/**
 * 这里的泛型是为了提示handle和parseTip的参数
 */
export default defineActionHandler<JumpLinkConfig>({
  // 动作执行器唯一标识符
  name: 'OpenPage',
  // 动作的标题
  label: '打开页面',
  // 动作说明
  description: '打开/跳转至指定页面',
  /**
   * 配置面板
   * markRaw标记为非响应式
   * @link https://staging-cn.vuejs.org/api/reactivity-advanced.html#markraw
   */
  configPanel: markRaw(
    defineComponent({
      // 动作执行器配置面板唯一标识符
      name: 'OpenPageConfigPanel',
      props: {
        // 每一个动作执行器的配置面板在实例化时都会提供四个参数，也就是下面函数的返回值
        // 分别是
        // `actionConfig` 该action的配置，用于编辑情况
        // `libraryComponentInstanceTree` 物料组件实例树
        // `focusedLibraryComponentInstanceData` 当前被选中的物料组件实例
        // `libraryComponentSchemaMap` 物料组件结构定义 键值对哈希表：组件名->组件结构
        ...getActionHandleDefaultProps<JumpLinkConfig>(),
      },
      setup(props, { expose }) {
        const formRef = ref<InstanceType<typeof ElForm>>()
        const config = ref<JumpLinkConfig>({
          url: '',
          blank: true,
        })

        /**
         * 如果是编辑的话
         */
        if (props.actionConfig?.openMode) {
          const actionConfig = toRaw(props.actionConfig)
          config.value = actionConfig.config as JumpLinkConfig
        }

        // 配置页面
        const render = () => (
          <>
            <ElForm ref={formRef} model={config.value}>
              <ElFormItem label="页面地址" prop="url">
                <ElInput v-model={config.value.url}></ElInput>
              </ElFormItem>
              <ElFormItem label="新窗口打开" prop="blank">
                <ElSwitch v-model={config.value.blank}></ElSwitch>
              </ElFormItem>
            </ElForm>
          </>
        )

        // 导出配置函数
        function exportConfig(): JumpLinkConfig {
          return config.value
        }

        /**
         * 如果此action有配置属性则必须要导出名为 `exportConfig` 的函数
         * 用户打开的 配置dialog 会调用此函数来获取config的值
         */
        expose({
          exportConfig,
        })
        return render
      },
    })
  ),
})
```

完成上述编码之后应该就能在配置 dialog 中看到开篇所见到的样子了

## 处理动作执行逻辑

目前为止我们还并不能执行这个动作，所以现在让我们来编写执行逻辑

```tsx
export default defineActionHandler<JumpLinkConfig>({
  // ...其他配置

  /**
   * 这里其实会传入三个参数
   * 分别是
   * `config` 该动作的配置，类型是上面传入的泛型 <JumpLinkConfig>
   * `libraryComponentInstanceTree` 物料组件实例树
   * `libraryComponentSchemaMap` 物料组件结构定义 键值对哈希表：组件名->组件结构
   */
  handler(props) {
    /**
     * 执行动作逻辑
     */
    function handle(config: JumpLinkConfig) {
      config.blank ? window.open(config.url) : window.location.assign(config.url)
    }
    handle(props)
  },
})
```

现在您可以先配置再去点击按钮体验一下了

## 解析动作提示信息

您可能会看到属性面板的事件中不仅显示动作执行器名称，也显示了操作的详细，那是怎么显示的呢？

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5d52e8z4dj30aw0endhe.jpg' />

下面我们一起来编写 `action 提示信息`

```tsx
export default defineActionHandler<JumpLinkConfig>({
  // ...其他配置

  /**
   * 同样这里有三个入参
   * 分别是
   * `config` 该动作的配置，类型是上面传入的泛型 <JumpLinkConfig>
   * `libraryComponentInstanceTree` 物料组件实例树
   * `libraryComponentSchemaMap` 物料组件结构定义 键值对哈希表：组件名->组件结构
   */
  parseTip(config) {
    let link = '',
      tip = ''
    const jumpConfig: JumpLinkConfig = config
    tip = '跳转至'
    link = jumpConfig.url

    // 这里可以选择返回组件亦或是字符串
    return () => (
      <>
        {tip}
        <span style={{ marginLeft: '.25rem', color: '#2468f2' }}>{link}</span>
      </>
    )
  },
})
```

::: tip 结束
Congratulation！您已经掌握编写动作执行器的基本方法，开始向丛林跟深处进发吧！
:::
