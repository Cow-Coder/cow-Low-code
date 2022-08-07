import { useCodeStore } from '@/stores/code'

export function useHomeF() {
  const codeStore = useCodeStore()
  function freeFocus() {
    codeStore.freeFocus()
  }

  function resetAll() {
    codeStore.clear()
    ElMessage.success('清空所有数据成功')
  }

  return [freeFocus, resetAll]
}
