import type { ComponentOptions } from "vue";

export interface libraryComponent extends ComponentOptions {
  /**
   * 所在library选项卡的name
   */
  libraryName: string;
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

const libraryComponents = import.meta.glob<libraryComponent>(
  "./*/index.(vue|jsx)",
  {
    eager: true,
  }
);

const libMap: Record<string, Record<string, libraryComponent[]>> = {};
const tempLib: Record<string, libraryComponent[]> = {};

// 添加每一个lib下面的组件
Object.entries(libraryComponents).forEach(([path, module]) => {
  module = module?.default || module;
  // TODO:添加类型
  if (!tempLib[module.libraryName]) tempLib[module.libraryName] = [];
  tempLib[module.libraryName].push(module);
});

// 再分类每个lib下面的组件到lib->tab
Object.entries(tempLib).forEach(([libraryName, modules]) => {
  if (!libMap[libraryName]) libMap[libraryName] = {};
  modules.forEach((module) => {
    if (!libMap[libraryName][module.tabName])
      libMap[libraryName][module.tabName] = [];
    libMap[libraryName][module.tabName].push(module);
  });
});

// 排序每个tab中的物料顺序
Object.entries(libMap).forEach(([_, modules]) => {
  Object.entries(modules).forEach(([_, module]) => {
    module.sort((a, b) => a.order - b.order);
  });
});
export default libMap;
