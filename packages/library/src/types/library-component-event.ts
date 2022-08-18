/**
 * 普通事件触发器数据
 */
export type CommonEventTriggerSchemaData = {
  /**
   * 事件名称
   */
  title: string
}

/**
 * 事件触发器
 */
export type EventTriggerSchema = {
  /**
   * 事件标识符
   * @name name
   */
  [name: string | symbol]: CommonEventTriggerSchemaData
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
  [name: string]:
    | LibraryComponentInstanceCommonEventTriggerData
    | LibraryComponentInstanceCustomEventTriggerData
}

/**
 * 物料组件实例的普通事件触发器数据
 */
export type LibraryComponentInstanceCommonEventTriggerData = {
  /**
   * 事件触发之后要执行的动作列表
   */
  actions: LibraryComponentInstanceActionItem[]
}

/**
 * 物料组件实例的自定义事件触发器数据
 */
export type LibraryComponentInstanceCustomEventTriggerData = {
  /**
   * 自定义事件执行代码
   */
  execCode: string
  /**
   * 事件名称
   * 便于用户区分不同自定义事件
   */
  title: string
  /**
   * 事件描述
   */
  description: string
} & LibraryComponentInstanceCommonEventTriggerData

/**
 * 物料组件实例 事件触发器->动作
 */
export type LibraryComponentInstanceActionItem = {
  /**
   * ActionHandler的唯一标识符
   * 与ActionHandler的name字段一致
   */
  actionName: string
  uuid: string
  config?: Record<string, any>
}
