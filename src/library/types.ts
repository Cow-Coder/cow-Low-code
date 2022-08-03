import type { ComponentOptions } from "vue";
import type { ELibraryName } from "@/components/libraryPanel/types";
import type { EAttributePanels } from "@/components/attributePanel/types";
import type { EEditableConfigItemInputType } from "@/components/editPanel/types";

/**
 * 组件单个prop
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
 * 组件Props
 */
export type ILibraryComponentProps = Record<string, ILibraryComponentPropItem>;

export interface ILibraryComponent extends ComponentOptions {
  /**
   * 物料组件标识符
   */
  name: string;
  /**
   * 所在library选项卡的name
   */
  libraryName: ELibraryName;
  /**
   *  所在lib->tab面板中的name
   */
  tabName: string;
  /**
   * 所在tab面板中的顺序
   */
  order: number;
  /**
   * 在左侧物料面板显示的信息
   */
  libraryPanelShowDetail: {
    /**
     * 在左侧物料面板显示的中文名称
     */
    title: string;
    icon: JSX.Element;
  };
  /**
   * 提示信息
   * 鼠标指向“?”触发
   */
  tips: {
    /**
     * 提示信息的标题
     * 单独成一行
     */
    title: string;
    /**
     * 提示信息的描述
     * 单独成一行
     */
    desc?: string;
    /**
     * 可预览的组件
     */
    preview?: JSX.Element;
  };
  /**
   * 右侧属性面板可编辑参数 && 物料组件props
   */
  props?: ILibraryComponentProps;
}
