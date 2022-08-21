# 自定义事件触发器

有时系统默认提供的事件不足以满足我们的要求，此时就需要用到 `自定义事件触发器` 功能了。

下面以 `按钮` 三击事件为例，进行简要说明。

::: warning 提示
`自定义事件触发器` 用法非常特殊，只建议了解 JS 和物料组件源码的高阶用户使用
:::

## 添加

1. 拖入一个按钮到画布中
2. 在右侧面板中选中 `事件`
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5eqscgpxrj30b5069wf8.jpg' />
3. 点击 `添加事件`，在弹出的面板中选择 `自定义事件`
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5erfkuzyjj30an05aaa8.jpg' />
4. 按照下图中的示例进行填写
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5erha3jzej30rm0lt7b1.jpg' />

```js
/**
 * 事件名称：三击事件
 * 事件描述：连续快速三次点击触发事件
 */
// 这里的代码会在对应组件setup中的一个匿名函数里执行
// 本函数有四个参数，分别是
// 1. context 一般对应setup的返回值
// 2. getCurrentInstance 对应setup中的getCurrentInstance函数实例
// 3. CUSTOM_EVENT_EMIT_NAME vue中emit的事件名。常量，目前是`dispatchEvent`，vue中emit的事件名
// 4. THIS_EMIT_NAME 当前事件触发器的唯一标识符

const instance = getCurrentInstance()
const props = instance.props
const emit = instance.emit

function injectDispatchClick(count) {
  console.log(count)
  context.dispatchClick(count)
  if (count === 3) {
    // 激活自身事件触发器
    emit(CUSTOM_EVENT_EMIT_NAME, THIS_EMIT_NAME)
  }
}
const multiClick = context.useMultiClick(injectDispatchClick, 200)
context.onClick = () => {
  multiClick()
}
```

5. 点击自定义事件触发器配置窗口的按钮

此时您应该能在右侧面板中看见 `三击事件` 已经添加到事件列表中了。
<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5erj6yb2aj30ao041aa5.jpg' />

## 验证

接下来让我测试一下该事件是否能够正常工作。

1. 在 `三击事件` 右侧点击 `+`
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5erl19j8gj30b903ldfx.jpg' />
2. 选择 `打开页面` 动作，并按照下图所示进行配置
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5erly0w2oj30rk0g8gnp.jpg' />
3. 点击 `确认`

此刻，事件的触发和响应都已经配置完毕。您可以选择在画布中点击进行测试，也可以在页面右上角找到 `预览` 并点击，在实际生产环境中试用一下。
