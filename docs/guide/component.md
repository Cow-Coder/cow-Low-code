# 物料组件

## 引言

牛搭的诞生离不开现如今优秀的开源氛围以及各个开源低代码项目

我们有一部分想法/思路/概念是源自于 [《低代码引擎搭建协议规范》](https://lowcode-engine.cn/lowcode)

## 定义

- **组件唯一标识** - 每个组件都有一个全局唯一标识，用于识别组件实例（相当于 DOM id），组件唯一标识可以通过组件属性面板进行查看；因组件的唯一标识的更改，会影响数据库存储（模型可能不同，会导致数据对不上的情况），为了不让普通用户误操作，我们提供了 Schema 编辑模式，当开发者需要的时候，可以小心使用；
- **物料** - 能够被沉淀下来直接使用的前端能力，一般表现为业务组件、区块、模板。
- **业务组件（Business Component）** - 业务领域内基于基础组件之上定义的组件，可能会包含特定业务域的交互或者是业务数据。
- **低代码业务组件（Low-Code Business Component）** - 通过低代码编辑器搭建而来，有别于源码开发的业务组件，属于业务组件中的一种类型，遵循业务组件的定义；同时低代码业务组件还可以通过低代码编辑器继续多次编辑。

::: details 细节
上述部分定义取自于 [宜搭](https://developers.aliwork.com/docs/guide/keywords)
:::

## 示例

下图中框选的都被称为 `物料组件`

<zoom-img src='https://tva1.sinaimg.cn/large/008d89Swgy1h5d6thmlowj30c809qt9o.jpg' />