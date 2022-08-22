import Setting from '../setting'
import type { ComponentPublicInstance } from 'vue'
import type { LibraryComponentsInstanceTree } from '@cow-low-code/types'
import type { PageJson } from '@cow-low-code/types/src/page'

export const useCodeStore = defineStore('CodeStore', () => {
  const set = Setting as unknown as PageJson
  const __APP_PREVIEW__ = ref<Readonly<boolean>>(!set.libraryJson)
  const init = (set.libraryJson ? set.libraryJson : []) as LibraryComponentsInstanceTree
  const libraryTree = ref<LibraryComponentsInstanceTree>(init)
  const componentRefMap = new Map<string, ComponentPublicInstance>()
  return {
    libraryTree,
    componentRefMap,
    __APP_PREVIEW__,
  }
})
