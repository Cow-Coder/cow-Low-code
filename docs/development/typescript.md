# TypeScript

牛搭中使用 TypeScript 来作为默认的开发语言，TypeScript 的好处已经无须赘述，无论是开发成本还是维护成本都能大大减少，是开发的必选。

## 什么时候推荐用 type 什么时候用 interface ？

推荐任何时候都是用 type， type 使用起来更像一个变量，与 interface 相比，type 的特点如下：

- 表达功能更强大，不局限于 object/class/function
- 要扩展已有 type 需要创建新 type，不可以重名
- 支持更复杂的类型操作

基本上所有用 interface 表达的类型都有其等价的 type 表达。在实践的过程中，我们也发现了一种类型只能用 interface 表达，无法用 type 表达，那就是往函数上挂载属性。

```ts
interface FuncWithAttachment {
  (param: string): boolean
  someProperty: number
}

const testFunc: FuncWithAttachment = {}
const result = testFunc('mike') // 有类型提醒
testFunc.someProperty = 3 // 有类型提醒
```

## 值可以为 null 或 undefined

在 3.8 中已经很简单了，obj?.xxx 即可。

## 某个库不存在 typescript 的定义

我们可以直接将其定义为 any。

```ts
import xxx from 'xxx'

declare module 'xxx'
```

## @ts-ignore

有些时候类型错误是组件的，但是看起来非常难受。会一直编译报报错，这里就可以使用 `@ts-ignore` 来**暂时**忽略它。

```ts
// @ts-ignore
xxxx
```

::: info
这里参考自 Ant Design Pro，请参阅：https://pro.ant.design/zh-CN/docs/type-script
:::
