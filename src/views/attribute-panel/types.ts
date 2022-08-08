import type { IDefineComponent, ILibraryComponentProps } from '@/library/types'
import type { ILibraryComponentInstanceProps } from '@/views/edit-panel/types'

/**
 * 右侧编辑面板的子tab枚举
 */
export enum EAttributePanels {
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
export interface IAttributePanelTabConfig {
  /**
   * 显示的文字
   */
  title: string
  /**
   * 唯一标识符
   */
  name: EAttributePanels
  /**
   * 自定义组件
   */
  component?: IDefineComponent
}

export interface formRenderSchema {
  propsData: ILibraryComponentInstanceProps | undefined
  cursorPanel: EAttributePanels
  propsSchema: ILibraryComponentProps | undefined
}
