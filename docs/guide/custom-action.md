# 自定义动作执行器

点击一个按钮，弹出一个提示框

上面的例子在开发中最常见不过了，但是要如何在牛搭中实现呢。下面我们对自定义动作执行器进行简单说明

## 步骤说明

1. 先拖拽一个按钮到画布中
2. 在右侧面板切换到 `事件`
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5eqscgpxrj30b5069wf8.jpg' />
3. 点击 `添加事件`，在弹出的面板中选择 `点击`
4. 接着点击 `点击事件` 右侧的 `+` 打开动作配置窗口
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5equit3wij30bm0600t2.jpg' />
5. 在动作配置窗口的左侧选中 `自定义JS`
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5eqwg04lbj30rb0hc78u.jpg' />
6. 然后按照下图输入对应的值
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5eqxuceg1j30hz03s74h.jpg' />

```js
alert('我是提示框')
```

7. 接着点击动作配置窗口的 `确认` 按钮

此时一个最简单的 `自定义动作执行器` 就完成了。

您可以在画布中直接点击该按钮，也可以在页面右上角找到 `预览` 按钮，在实际生产环境中试用一下

::: info 信息
如果您无法正常显示预览页面，请查看[预览页面](preview)进行相应配置之后再使用
:::
