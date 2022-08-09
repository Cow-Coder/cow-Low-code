import type { LibraryNameEnum } from '@/views/library-panel/types'
import type { LibraryComponentPropItem } from '@/library/types'

export type LibraryComponentInstanceProps = Data

/**
 * 事件触发时需要执行的动作类型
 */
export enum ActionTypeEnum {
  reload = 'reload',
  request = 'request',
}

/**
 * 物料组件实例的数据
 */
export interface LibraryComponentInstanceData {
  /**
   * 全局唯一ID
   */
  uuid: string
  /**
   * 是否选中当前物料组件实例
   * @deprecated
   */
  focus: boolean
  /**
   * 物料库标识符
   */
  libraryName: LibraryNameEnum
  /**
   * 在vue中组件名
   */
  componentName: string
  /**
   *右侧属性面板可编辑参数
   */
  props?: LibraryComponentInstanceProps
  /**
   * 事件触发器
   */
  eventTriggers?: LibraryComponentInstanceEventTriggers
}

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

/**
 * 编辑面板每个config的表单类型
 * TODO:这里需要拓展其他类型
 */
export enum EditableConfigItemInputTypeEnum {
  /**
   * 输入框
   */
  input = 'input',
  /**
   * 开关
   */
  switch = 'switch',
  /**
   * 不定个数输入框
   */
  indefiniteNumberInputBox = 'indefiniteNumberInputBox',
  /**
   * 下拉框
   */
  select = 'select',
  /**
   * 带插槽的开关
   */
  switchWithSlots = 'switchWithSlots',
}
/**
 * selectpropsType
 */

export type EditableConfigItemSelectType = {
  label: string
  options: string[]
  defaultValue: any
}
/**
 * attribute属性编辑面板每个form表单项结构
 */
export type AttributePanelFormItemSchema = {
  /**
   * 表单name，唯一标识符
   * 对应 ILibraryComponentPropItem 的键名
   */
  name: string
} & LibraryComponentPropItem

/**
 * 编辑区被选中物料组件的定位数据
 */
export interface ILibraryComponentInstanceFocus {
  path?: string | undefined
  uuid: string | undefined
}
