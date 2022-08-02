import type { ComponentOptions } from "vue";

export interface ITabList {
  /**
   * 折叠面板中的折叠项的唯一标识符
   */
  [key: string]: {
    /**
     * 折叠面板中的折叠项的显示名称
     */
    title: string;
  };
}

export enum ELibraryName {
  generics = "generics",
}

export interface ILibraryPanel extends ComponentOptions {
  /**
   * 物料面板的唯一标识符
   */
  libraryName: ELibraryName;
  /**
   * 物料面板的在左侧选项卡处的名称
   */
  libraryTitle: string;
  /**
   * 折叠面板的折叠项目
   */
  tabsList?: ITabList;
}
