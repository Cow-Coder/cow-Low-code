import type { LibraryComponentPropItem } from '@/types/library-component'

/**
 * 右侧编辑面板的子tab枚举
 */
export enum AttributePanelsEnum {
  /**
   * 常规 编辑面板
   */
  generic = 'generic',
  /**
   * 外观 编辑面板
   */
  appearance = 'appearance',
  /**
   * 事件 编辑面板
   */
  event = 'event',
}

/**
 * 编辑面板每个config的表单类型
 * TODO:这里需要拓展其他类型
 */
export enum AttributePanelFormItemInputTypeEnum {
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
  /**
   * 滑块
   */
  slider = 'slider',
  /**
   * 颜色选择器
   */
  colorPicker = 'colorPicker',
  /**
   * 步进器
   */
  stepper = 'stepper',
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
 * 物料组件面板Tab唯一标识符
 */
export enum LibraryPanelTabEnum {
  generics = 'generics',
}
