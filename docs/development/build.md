# 构建与部署

## 构建

开发完成之后，使用 `pnpm run build:editor` 进行构建，构建打包成功之后，会在根目录生成 `dist/editor` 文件夹，里面就是构建打包好的文件。

::: tip 提示
如果需要构建 `docs`、`preview`

请使用 `pnpm run build:docs`、`pnpm run build:preview`

其中打包生成的目录分别位于 `docs/.vitepress/dist`、`dist/preview`

如果需要构建 `vite-plugin-monaco-editor-nls`、`build-utils` 等，请执行对应 `package.json` 中的相应脚本
:::

## 预览

生成好的 dist 文件夹一般需要部署至服务器才算部署发布成功，但为了保证构建出来的文件能正常运行，开发者通常希望能在本地先预览一下，这里介绍两种方式

- 执行相应 `package.json` 中的脚本
  例如 `packages\editor\package.json` 中的 `preview` 命令

```sh
# -C 选项，请参阅：https://pnpm.io/zh/pnpm-cli#%E9%85%8D%E7%BD%AE%E9%A1%B9
pnpm -C packages\editor preview
```

- 本地服务器预览

```sh
# 进入打包的后目录
cd packages\editor
# 本地预览，默认端口8080
npx http-server
```

## 分析构建文件体积

如果构建文件很大，可以通过 [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer) 插件进行代码体积分析，从而优化你的代码。

打包之后您应该能在对应包的根目录下找到 `stat.html` 文件

打开之后可以看到具体的体积分布，以分析哪些依赖有问题。

<ZoomImg src="https://tva1.sinaimg.cn/large/008d89Swgy1h5ckk3h2zej31hc0ps7td.jpg" />

## 部署

简单的部署只需要将最终生成的静态文件，dist 文件夹的静态文件发布到 cdn 或者静态服务器即可

### 使用 nginx 处理跨域

使用 nginx 处理项目部署后的跨域问题

1. 配置前端项目接口地址

```text
http://10.10.10.10:8080/api
```

2. 在 nginx 配置请求转发到后台

```nginx
server {
  listen       80;
  server_name  example.com;
  # 接口代理，用于解决跨域问题
  location /api {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # 后台接口地址
    proxy_pass http://10.10.10.10:8080/api;
    proxy_redirect default;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
  }
}
```
