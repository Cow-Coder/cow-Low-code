import type { LibraryComponentsInstanceTree } from '@cow-low-code/types'

export const useCodeStore = defineStore('CodeStore', () => {
  const libraryTree = ref<LibraryComponentsInstanceTree>([])
  return {
    libraryTree,
  }
})
