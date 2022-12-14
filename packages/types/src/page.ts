import type { LibraryComponentsInstanceTree } from './library-component'

export type PageSetting = {
  /**
   * 页面标题
   */
  title: string
  isPreview?: boolean
}

/**
 * 整个页面数据
 */
export type PageJson = PageSetting & {
  libraryJson: LibraryComponentsInstanceTree
}
