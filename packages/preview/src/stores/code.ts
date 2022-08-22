import { cloneDeep } from 'lodash-es'
import Setting from '../setting'
import type { ComponentPublicInstance } from 'vue'
import type { LibraryComponentsInstanceTree } from '@cow-low-code/types'
import type { PageJson, PageSetting } from '@cow-low-code/types/src/page'

export const useCodeStore = defineStore('CodeStore', () => {
  const set = Setting as unknown as PageJson
  const __APP_PREVIEW__ = ref<Readonly<boolean>>(!set.libraryJson)
  const init = (set.libraryJson ? set.libraryJson : []) as LibraryComponentsInstanceTree
  const libraryTree = ref<LibraryComponentsInstanceTree>(init)
  const componentRefMap = new Map<string, ComponentPublicInstance>()
  const pageSetting = ref<PageSetting>()

  watch(
    () => pageSetting.value?.title,
    (title) => {
      title && title !== '' ? useTitle(title) : undefined
    }
  )

  function dispatchPageJson(json: PageJson) {
    const _json = cloneDeep(json)
    libraryTree.value = _json.libraryJson
    delete (_json as Partial<PageJson>).libraryJson
    pageSetting.value = _json
  }
  return {
    libraryTree,
    componentRefMap,
    __APP_PREVIEW__,
    pageSetting,
    dispatchPageJson,
  }
})
