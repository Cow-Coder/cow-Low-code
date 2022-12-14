import type { LibraryComponent, LibraryPanelTabEnum } from '@cow-low-code/types'

const libraryComponents = import.meta.glob<LibraryComponent>(
  './src/components/**/index.(vue|jsx)',
  {
    eager: true,
  }
)
const libraryTree: Record<string, Record<string, LibraryComponent[]>> = {}
const libraryRecord: Record<string, LibraryComponent[]> = {}
const libraryMap: Record<string, LibraryComponent> = {}

// 添加每一个lib下面的组件
Object.entries(libraryComponents).forEach(([, module]) => {
  module = module?.default || module
  if (!libraryRecord[module.libraryName]) libraryRecord[module.libraryName] = []
  libraryRecord[module.libraryName].push(module)
  libraryMap[module.name] = module
})

// 再分类每个lib下面的组件到lib->tab
Object.entries(libraryRecord).forEach(([libraryName, modules]) => {
  if (!libraryTree[libraryName]) libraryTree[libraryName] = {}
  modules.forEach((module) => {
    if (!libraryTree[libraryName][module.tabName]) libraryTree[libraryName][module.tabName] = []
    libraryTree[libraryName][module.tabName].push(module)
  })
})

// 排序每个tab中的物料顺序
Object.entries(libraryTree).forEach(([, modules]) => {
  Object.entries(modules).forEach(([, module]) => {
    module.sort((a, b) => a.order - b.order)
  })
})

function getLibraryModules(libraryName: LibraryPanelTabEnum) {
  return libraryTree[libraryName] ?? {}
}

export {
  /**
   * 按照 物料面板 分类
   */
  libraryRecord,
  /**
   * 组件名->组件对象 的键值对
   */
  libraryMap,
  getLibraryModules,
}

/**
 * 按照 物料面板->展示tab 分类
 */
export default libraryTree
