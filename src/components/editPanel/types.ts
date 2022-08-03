import type { ELibraryName } from "@/components/libraryPanel/types";
import type { EAttributePanels } from "@/components/attributePanel/types";

/**
 * 此类型是作用于物料组件实例的
 */
export type IEditableConfigValue = Partial<{
  [key in EAttributePanels]: Record<string, any>;
}>;

/**
 * 物料组件实例的参数
 */
export interface IEditableInstancedLibraryComponentData {
  /**
   * 全局唯一ID
   * TODO:暂时不知道干啥用
   */
  uuid: string;
  /**
   * 是否选中当前物料组件实例
   */
  focus: boolean;
  /**
   * 物料库标识符
   */
  libraryName: ELibraryName;
  /**
   * 在vue中组件名
   */
  componentName: string;
  /**
   *右侧属性面板可编辑参数
   */
  editableConfig?: IEditableConfigValue;
}

/**
 * 编辑面板每个config的表单类型
 * TODO:这里需要拓展其他类型
 */
export enum EEditableConfigItemInputType {
  /**
   * 输入框
   */
  input = "input",
  /**
   * 开关
   */
  switch = "switch",
}

/**
 * 编辑面板每个config的结构
 */
export interface IEditableConfigPanelItemSchema {
  /**
   * 表单name，唯一标识符
   */
  name: string;
  /**
   * 表单类型
   */
  type: EEditableConfigItemInputType;
  /**
   * 描述标题
   */
  title: string;
  /**
   * 提示信息
   */
  tips?: string;
  /**
   * 默认值
   */
  default?: any;
}

/**
 * 编辑面板每个config的结构
 */
export interface ILibraryComponentPropItem {
  /**
   * 表单类型
   */
  formType: EEditableConfigItemInputType;
  /**
   * 描述标题
   */
  title: string;
  /**
   * 提示信息
   */
  tips?: string;
  /**
   * 默认值
   */
  default?: any;
  /**
   * 当前属性应该显示在哪个面板
   */
  belongToPanel: EAttributePanels;
}

/**
 * 编辑区被选中物料组件的定位数据
 */
export interface IEditableInstancedLibraryComponentDataAtFocus {
  path: string | undefined;
  uuid: string | undefined;
}
