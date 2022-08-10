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
  config?: Record<string, any>
}

/**
 * Action处理器的结构
 */
export type ActionHandlerSchema = {
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
   */
  handler?: () => void
  /**
   * 配置界面
   */
  configPanel?: (() => JSX.Element) | DefineComponent
  children?: ActionHandlerSchema[]
}

/**
 * 动作配置dialog返回结果
 */
export type ActionConfigResult = {
  actionName: string
  config: Record<string, any> | undefined
}
