import type { ComponentOptions } from "vue";
import type { ELibraryName } from "@/components/libraryPanel/types";

export interface ILibraryComponent extends ComponentOptions {
  /**
   * 组件标识符
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
}
