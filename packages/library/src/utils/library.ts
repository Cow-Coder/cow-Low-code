import type { LibraryComponent, LibraryComponentPropItem, SlotItemValue } from '@cow-low-code/types'

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

/**
 * 构建列选项
 * @param str
 */
export const createSlots = (str: string): SlotItemValue => {
  return str.split(':').reduce(
    (prev, curr, index) => {
      prev[`slot${index}`] = {
        key: `slot${index}`,
        span: curr,
        children: [],
      }
      return prev
    },
    { value: str } as SlotItemValue
  )
}
