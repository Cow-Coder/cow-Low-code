import type { ComponentOptions } from "vue";
import type { ELibraryName } from "@/components/libraryPanel/types";
import type { EAttributePanels } from "@/components/attributePanel/types";
import type { IEditableConfigPanelItemSchema } from "@/components/editPanel/types";

/**
 * 物料组件可编辑的参数
 * 存在的意义是为了在组件types.ts中定义时候约束[键名]
 * 此类型是作用于物料组件的，而不是物料组件实例
 * TODO:这里的泛型可以删除了
 */
export type IEditableConfig = Partial<{
  [key in EAttributePanels]: IEditableConfigPanelItemSchema[];
}>;

export interface ILibraryComponent<
  T extends IEditableConfig = IEditableConfig
> {
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
   *右侧属性面板可编辑参数
   */
  editableConfig?: T;
}
