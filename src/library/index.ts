import type { LibraryComponent } from '@/library/types'
import type { ELibraryName } from '@/views/library-panel/types'

const libraryComponents = import.meta.glob<LibraryComponent>('./*/index.(vue|jsx)', {
  eager: true,
})
const libraryTree: Record<string, Record<string, LibraryComponent[]>> = {}
const libTemp: Record<string, LibraryComponent[]> = {}

// 添加每一个lib下面的组件
Object.entries(libraryComponents).forEach(([, module]) => {
  module = module?.default || module
  if (!libTemp[module.libraryName]) libTemp[module.libraryName] = []
  libTemp[module.libraryName].push(module)
})

// 再分类每个lib下面的组件到lib->tab
Object.entries(libTemp).forEach(([libraryName, modules]) => {
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
export const libraryRecord = libTemp
export default libraryTree

export function getLibraryModules(libraryName: ELibraryName) {
  return libraryTree[libraryName] ?? {}
}
