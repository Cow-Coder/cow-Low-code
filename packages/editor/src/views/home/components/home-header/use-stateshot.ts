import { History } from 'stateshot'
import { cloneDeep } from 'lodash-es'
import { useCodeStore } from '@/stores/code'

export default function useStateShot() {
  const codeStore = useCodeStore()
  const { jsonCode } = storeToRefs(codeStore)
  let isUndoOrRedoing = false
  const codeHistory = new History<typeof jsonCode.value>({ useChunks: false })
  watch(
    jsonCode,
    (value) => {
      const val = toRaw(value)
      if (isUndoOrRedoing) {
        isUndoOrRedoing = false
        return undefined
      }
      codeHistory.push(cloneDeep(val))
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
      jsonCode.value = codeHistory.get()
    },
    redo: () => {
      if (!codeHistory.hasRedo) {
        ElMessage.warning('已经到底了')
        return undefined
      }
      isUndoOrRedoing = true
      codeHistory.redo()
      jsonCode.value = codeHistory.get()
    },
  }
}
