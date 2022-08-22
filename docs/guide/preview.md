# 预览页面

为了方便调试，随时查看生产环境显示效果，我们也提供了预览功能。

当您页面设计完成之后，您可以点击页面右上角的 `预览` 按钮进行查看。

如果您的预览页面无法正常显示，请继续阅读下面有关内容。

## 配置

在页面左侧面板中选中 `设置` 即可见到 `预览服务地址` 配置项。
<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5er5ux2imj30bp07kaas.jpg' />

此处需要注意的是

- 如果您访问的是[线上 Demo](https://cow-coder.github.io/cow-Low-code/)，那么需要把此项设置为 `https://cow-coder.github.io/preview-cow-low-code/`
- 如果您的本地调试，那么需要设置为 `preview` 子项目对应的访问地址，一般为 `http://127.0.0.1:5174`

::: details 细节
如果您启动 `editor` 和 `preview` 的顺序不同，那么端口号可能会和文档有所出入，此时请以 cli 中显示的为准

如果端口冲突，那么 vite 会自动向后+1 个端口号，比如：`5174`、`5175`
:::

当一切准备就绪之后，您应该能够看到如下页面：

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5fk2j23ctj30il0oomzm.jpg' />

## 常见问题

1. 为什么预览页面没有显示手机壳模型？
   <zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5fjdvnzd4j30jo0gj0uo.jpg' />

这种情况是由于您在 `preview` 模块中设置了发布的代码，导致 preview 以真实的手机环境在运行

此时您只需要把 `packages/preview/src/setting.ts` 文件中的内容替换成默认的空设置即可

```javascript
export default {}
```
