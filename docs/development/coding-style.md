# 代码规范

## IDE 编辑器

如果您使用的是 WebStorm，那么可以在设置中开启下列功能：

- `语言和框架 > JavaScript > 代码质量工具 > ESLint` 勾选 `保存时运行eslint --fix`
- `语言和框架 > JavaScript > Prettier` 勾选 `执行"重新格式化代码"操作时` 和 `保存时`

如果您使用的是 Visual Studio Code，框架源码里已提供相关配置文件，可直接测试效果：在保存代码时，会自动对当前文件进行代码格式化操作。

## husky & lint-staged

由于 IDE 能做的事比较有限，只能对代码的书写规范进行格式化，对于一些无法自动修复的错误代码，如果没有改正到就被推送到 git 仓库，在多人协作开发时，可能会影响到别人的开发体验。所以我们集成了 husky 和 lint-staged 这两个依赖来解决这一问题。

在提交代码时，husky 会通过 lint-staged 对 /src 目录下的 js vue scss 文件进行分别进行 eslint 和 stylelint 检测，如果有报错，则会阻止本次代码提交，直到开发者修改完所有错误代码后，才允许提交到 git 仓库，这样可以确保 git 仓库里的代码不会有语法错误。

::: tip 提示
可通过修改 `.eslintignore` 和 `.prettierignore` 忽略无需做代码规范校验的文件，例如在项目中导入了一些第三方的插件或组件，我们就可以将其进行忽略。
:::

## 配置代码规范

配置文件主要有 3 处，分别为

- IDE 配置(`.editorconfig`)
- ESLint 配置(`.eslintrc.cjs` 和 `.eslintignore`)
- Prettier 配置(`.prettierrc.cjs` 和 `.prettierignore`)

通过下面命令会将代码进行一次格式校验，如果规则支持自动修复，则会将不符合规则的代码自动进行格式化。

```shell
pnpm run lint:fix
```

而使用 `pnpm run lint` 可以检测当前代码还有哪些地方是不符合规范的。

## 关闭代码规范校验

注重代码规范是一个程序员的职业基本素养，并且当多人协助开发时，它是保证代码一致性的最佳手段。
