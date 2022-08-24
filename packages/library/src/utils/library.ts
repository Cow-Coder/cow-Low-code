import type { LibraryComponent, LibraryComponentPropItem } from '@cow-low-code/types'

/**
 * 快速定义物料组件
 * @param libraryComponent
 */
export function defineLibraryComponent(libraryComponent: Omit<LibraryComponent, 'props'>) {
  return libraryComponent
}

/**
 * 快速创建物料组件的一个prop
 * @param data
 */
export function createLibraryComponentPropItem(data: LibraryComponentPropItem) {
  return data
}
