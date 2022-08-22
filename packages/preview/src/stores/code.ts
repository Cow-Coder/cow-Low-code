import Setting from '../setting'
import type { ComponentPublicInstance } from 'vue'
import type { LibraryComponentsInstanceTree } from '@cow-low-code/types'

export const useCodeStore = defineStore('CodeStore', () => {
  const init = Setting.json !== '' ? JSON.parse(Setting.json) : []
  const libraryTree = ref<LibraryComponentsInstanceTree>(init)
  const componentRefMap = new Map<string, ComponentPublicInstance>()
  return {
    libraryTree,
    componentRefMap,
  }
})
