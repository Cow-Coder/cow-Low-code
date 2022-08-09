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
 * 事件触发时需要执行的动作类型
 */
export enum ActionTypeEnum {
  reload = 'reload',
  request = 'request',
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
    actions: Array<{
      actionType: ActionTypeEnum
    }>
  }
}
