import type { ELibraryName } from '@/components/libraryPanel/types'
import type { ILibraryComponentPropItem } from '@/library/types'

export type ILibraryComponentInstanceProps = Data

/**
 * 物料组件实例的数据
 */
export interface ILibraryComponentInstanceData {
  /**
   * 全局唯一ID
   */
  uuid: string
  /**
   * 是否选中当前物料组件实例
   */
  focus: boolean
  /**
   * 物料库标识符
   */
  libraryName: ELibraryName
  /**
   * 在vue中组件名
   */
  componentName: string
  /**
   *右侧属性面板可编辑参数
   */
  props?: ILibraryComponentInstanceProps
}

/**
 * 编辑面板每个config的表单类型
 * TODO:这里需要拓展其他类型
 */
export enum EEditableConfigItemInputType {
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
}

/**
 * attribute属性编辑面板每个form表单项结构
 */
export type IAttributePanelFormItemSchema = {
  /**
   * 表单name，唯一标识符
   * 对应 ILibraryComponentPropItem 的键名
   */
  name: string
} & ILibraryComponentPropItem

/**
 * 编辑区被选中物料组件的定位数据
 */
export interface ILibraryComponentInstanceFocus {
  path?: string | undefined
  uuid: string | undefined
}
