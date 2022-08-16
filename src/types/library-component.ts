import type { Component, ComponentOptions, Prop } from 'vue'
import type {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@/types/panel'
import type {
  EventTriggerSchema,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'

export type LibraryComponentInstanceProps = Data

/**
 * 该项表单label显示位置
 */
export enum LibraryComponentFormItemLabelPositionEnum {
  aside = 'aside',
  top = 'top',
}

export interface SelectOption {
  title: string
  value: any
}

/**
 * 组件单个prop
 */
export type LibraryComponentPropItem = {
  /**
   * 表单类型
   */
  formType: AttributePanelFormItemInputTypeEnum
  /**
   * 描述标题
   */
  title: string
  /**
   * 提示信息
   */
  tips?: string
  /**
   * 默认值
   */
  default?: any
  /**
   * 该项表单label显示位置
   */
  labelPosition?: LibraryComponentFormItemLabelPositionEnum
  /**
   * 当前属性应该显示在哪个面板
   */
  belongToPanel: AttributePanelsEnum
  /**
   * select选项
   */
  selectOptions?: SelectOption[]
} & Prop<any>

/**
 * 组件Props
 */
export type LibraryComponentProps = Record<string, LibraryComponentPropItem>

/**
 * vue组件和jsx组件
 */
export type DefineComponent = (() => JSX.Element) | Component

/**
 * 所在lib->tab面板中的name
 */
type TabName = 'form' | 'show'
/**
 * 物料组件
 */
export interface LibraryComponent extends ComponentOptions {
  /**
   * 物料组件标识符
   */
  name: string
  /**
   * 所在library选项卡的name
   */
  libraryName: LibraryPanelTabEnum
  /**
   *  所在lib->tab面板中的name
   */
  tabName: TabName
  /**
   * 所在tab面板中的顺序
   */
  order: number
  /**
   * 在左侧物料面板显示的信息
   */
  libraryPanelShowDetail: {
    /**
     * 在左侧物料面板显示的中文名称
     */
    title: string
    icon: DefineComponent
  }
  /**
   * 提示信息
   * 鼠标指向“?”触发
   */
  tips: {
    /**
     * 提示信息的标题
     * 单独成一行
     */
    title: string
    /**
     * 提示信息的描述
     * 单独成一行
     */
    desc?: string
    /**
     * 可预览的组件
     */
    preview?: DefineComponent
  }
  /**
   * 右侧属性面板可编辑参数 && 物料组件props
   */
  props?: LibraryComponentProps
  /**
   * 定义触发事件的情况
   */
  eventTriggers?: EventTriggerSchema
}

/**
 * 物料组件实例的数据
 */
export interface LibraryComponentInstanceData {
  /**
   * 在渲染中用于v-for的id
   * 可能会变化，例如要强制重新渲染组件的话，就需要修改indexId
   */
  indexId: string
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
  libraryName: LibraryPanelTabEnum
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

/**
 * 编辑区被选中物料组件的定位数据
 */
export interface ILibraryComponentInstanceFocus {
  path?: string | undefined
  uuid: string | undefined
}
