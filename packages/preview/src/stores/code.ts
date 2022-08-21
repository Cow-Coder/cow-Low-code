import type { ComponentPublicInstance } from 'vue'
import type { LibraryComponentsInstanceTree } from '@cow-low-code/types'

export const useCodeStore = defineStore('CodeStore', () => {
  const libraryTree = ref<LibraryComponentsInstanceTree>([])
  const componentRefMap = new Map<string, ComponentPublicInstance>()
  return {
    libraryTree,
    componentRefMap,
  }
})
