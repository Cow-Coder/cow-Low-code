import { defineComponent } from 'vue'
import type { ComponentPublicInstance, DefineComponent, PropType } from 'vue'
import type { ComponentOptionsBase, ComponentPropsOptions } from '@vue/runtime-core'
import type { LibraryComponentInstanceData } from '@/types/library-component'

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
