import type { DefineComponent, LibraryComponentProps } from '@/library/types'
import type { LibraryComponentInstanceProps } from '@/views/edit-panel/types'

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
 * 单个子tab配置
 */
export interface AttributePanelTabConfig {
  /**
   * 显示的文字
   */
  title: string
  /**
   * 唯一标识符
   */
  name: AttributePanelsEnum
  /**
   * 自定义组件
   */
  component?: DefineComponent
}

export interface formRenderSchema {
  propsData: LibraryComponentInstanceProps | undefined
  cursorPanel: AttributePanelsEnum
  propsSchema: LibraryComponentProps | undefined
}
