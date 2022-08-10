import type { ComponentPublicInstance, defineComponent } from 'vue'
import type { ComponentOptionsBase, ComponentPropsOptions } from '@vue/runtime-core'
import type { ComponentPublicInstanceConstructor } from '../../types/vue'

/**
 * 事件触发器
 */
export type EventTrigger = {
  /**
   * 事件标识符
   * @name name
   */
  [name: string]: {
    /**
     * 事件名称
     */
    title: string
  }
}

/**
 * 物料组件实例的事件触发器
 */
export type LibraryComponentInstanceEventTriggers = {
  /**
   * 事件标识符
   * @name name
   * @see IEventTrigger
   */
  [name: string]: {
    actions: LibraryComponentInstanceActionItem[]
  }
}

export type LibraryComponentInstanceActionItem = {
  /**
   * ActionHandler的唯一标识符
   * 与ActionHandler的name字段一致
   */
  actionName: string
  uuid: string
  config?: Record<string, any>
}

/**
 * Action处理器的结构
 */
export type ActionHandlerSchema<T = any> = {
  /**
   * action唯一标识符
   */
  name: string
  /**
   * 名称
   */
  label: string
  /**
   * 动作说明
   */
  description: string
  /**
   * 指定处理的函数
   * @param args
   */
  handler?: (config: T) => any
  /**
   * 配置界面
   */
  configPanel?:
    | (() => JSX.Element)
    | (ComponentPublicInstanceConstructor &
        ComponentOptionsBase<any, any, any, any, any, any, any, any>)
  /**
   * 在event-tab-pane中显示action的提示信息
   * @param args
   */
  parseTip?: (config: T) => string | (() => JSX.Element)
  /**
   * 如果有children字段说明是可展开的节点
   * 可展开节点不会作为ActionHandler处理
   */
  children?: ActionHandlerSchema[]
}

/**
 * 动作配置dialog返回结果
 */
export type ActionConfigResult = {
  actionName: string
  config: Record<string, any> | undefined
}
