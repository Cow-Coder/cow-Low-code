import { defineComponent } from 'vue'
import type { LibraryComponent, LibraryComponentInstanceData } from '@/types/library-component'
import { getActionHandleDefaultProps } from '@/views/home/components/action-config-dialog/util'

function actionHandlerConfigPanelDefineComponent<T>() {
  return defineComponent({
    props: getActionHandleDefaultProps<T>(),
  })
}

/**
 * Action处理器的结构
 */
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
    libraryComponentSchemaMap: Record<string, LibraryComponent>
  ) => any
  /**
   * 配置界面
   */
  configPanel?: ReturnType<typeof actionHandlerConfigPanelDefineComponent<T>>
  /**
   * 在event-tab-pane中显示action的提示信息
   * @param args
   */
  parseTip?: (
    config: T,
    libraryComponentInstanceTree: LibraryComponentInstanceData[],
    libraryComponentSchemaMap: Record<string, LibraryComponent>
  ) => string | (() => JSX.Element)
  /**
   * 如果有children字段说明是可展开的节点
   * 可展开节点不会作为ActionHandler处理
   */
  children?: ActionHandlerSchema[]
}

/**
 * 动作配置dialog返回结果
 */
export type ActionConfigResult = {
  actionName: string
  config: Record<string, any> | undefined
}
