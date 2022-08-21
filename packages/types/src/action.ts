import { defineComponent } from 'vue'
import { getActionHandleDefaultProps } from '@cow-low-code/utils'
import type { ComponentPublicInstance } from 'vue'
import type { LibraryComponent, LibraryComponentInstanceData } from './library-component'

/**
 * Action处理器的结构
 */
function actionHandlerConfigPanelDefineComponent<T>() {
  return defineComponent({
    props: getActionHandleDefaultProps<T>(),
  })
}
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
   * 显示顺序
   */
  order?: number
  /**
   * 动作说明
   */
  description: string
  /**
   * 指定处理的函数
   * @param args
   */
  handler?: (
    config: T,
    libraryComponentInstanceTree: LibraryComponentInstanceData[],
    libraryComponentSchemaMap: Record<string, LibraryComponent>,
    libraryComponentInstanceRefMap: Map<string, ComponentPublicInstance>
  ) => any
  /**
   * 配置界面
   */
  configPanel?:
    | ReturnType<typeof actionHandlerConfigPanelDefineComponent<T>>
    | ((config: T) => JSX.Element)
  /**
   * 在event-tab-pane中显示action的提示信息
   * @param args
   */
  parseTip?: (
    config: T,
    libraryComponentInstanceTree: LibraryComponentInstanceData[],
    libraryComponentSchemaMap: Record<string, LibraryComponent>,
    libraryComponentInstanceRefMap: Map<string, ComponentPublicInstance>
  ) => string | (() => JSX.Element)
  /**
   * 如果有children字段说明是可展开的节点
   * 可展开节点不会作为ActionHandler处理
   */
  children?: ActionHandlerSchema[]
}
