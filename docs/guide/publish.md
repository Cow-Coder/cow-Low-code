# 发布页面

当您完成页面设计之后就可以点击右上角的 `发布` 按钮导出页面数据

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5fjjbf22nj30um0l37cc.jpg' />

## 配置

将以上显示的配置数据复制到 `packages/preview/src/setting.ts` 中进行替换即可完成。

::: tip 提示
替换时候不能全部都粘贴配置文件，需要在开头加上 `export default `

您的配置代码看起来应该是这样

```javascript
export default {
  // ...您的配置
}
```

:::

## 打包

1. 源码下载、环境配置，请参阅：[准备工作](../development/prepare)
2. 在项目根目录执行

```shell
pnpm run build:preview
```

3. 等待命令执行完成之后，即可在 `/dist/preview` 文件夹下找到生成好的文件

此时已经可以将生成好的文件部署到您的服务器上了

您可以使用浏览器直接打开预览，可以使用下面命令进行预览

```shell
// 1. 进入 /dist/preview 目录

// 2. 运行本地静态服务器
npx http-server
```

如果正确执行的话，您会的到类似如下的输出

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5fjwmpwvsj30ef0akju6.jpg' />

此时访问 ` http://127.0.0.1:8080` 即可

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5fjxxwyl1j30in0q1tet.jpg' />
