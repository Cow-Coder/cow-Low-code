import { History } from 'stateshot'
import { cloneDeep, isEqual } from 'lodash-es'
import type { LibraryComponentsInstanceTree } from '@cow-low-code/types'
import { useCodeStore } from '@/stores/code'

export default function useStateShot() {
  const codeStore = useCodeStore()
  const { jsonCode } = storeToRefs(codeStore)
  let isUndoOrRedoing = false
  const codeHistory = new History<typeof jsonCode.value>({ useChunks: false })
  let lastJsonCode: undefined | LibraryComponentsInstanceTree = undefined
  watch(
    jsonCode,
    (value) => {
      const rawValue = toRaw(value)
      if (isUndoOrRedoing) {
        isUndoOrRedoing = false
        return undefined
      }
      if (isEqual(rawValue, lastJsonCode)) return undefined
      lastJsonCode = cloneDeep(rawValue)
      codeHistory.push(lastJsonCode)
    },
    { immediate: true, deep: true }
  )
  return {
    get: () => codeHistory.get(),
    undo: () => {
      if (!codeHistory.hasUndo) {
        ElMessage.warning('已经到底了')
        return undefined
      }
      isUndoOrRedoing = true
      codeHistory.undo()
      jsonCode.value = reactive(cloneDeep(codeHistory.get()))
    },
    redo: () => {
      if (!codeHistory.hasRedo) {
        ElMessage.warning('已经到底了')
        return undefined
      }
      isUndoOrRedoing = true
      codeHistory.redo()
      jsonCode.value = reactive(cloneDeep(codeHistory.get()))
    },
  }
}
