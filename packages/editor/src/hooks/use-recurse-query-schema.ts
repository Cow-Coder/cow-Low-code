import type { LibraryComponentInstanceData, SlotItemValue } from '@/types/library-component'
import { useCodeStore } from '@/stores/code'

/**
 * 通过Id，递归查询组件
 * @param queryId ：组件的 uuid
 * @return : 对应的组件实例 | undefined
 */
export const useRecurseQuerySchema = (
  queryId: string | undefined
): LibraryComponentInstanceData | undefined => {
  if (!queryId) return undefined
  // 递归查找实例
  let focusedCompInstanceType = undefined
  const _recurseGetCompInstance = (targetArr: any[]) => {
    for (const jsonCodeElement of targetArr) {
      if (jsonCodeElement?.props?.slots) {
        // 来到这说明是容器组件
        if (jsonCodeElement?.uuid === queryId) {
          // 使容器本身可以被找到
          focusedCompInstanceType = jsonCodeElement
          break
        }
        // 遍历容器里面的插槽，拿到他们的children递归遍历
        Object.values(jsonCodeElement.props.slots)
          ?.filter((item) => typeof item !== 'string')
          .forEach((fItem) => {
            const slotItem = fItem as SlotItemValue
            if (slotItem?.children?.length > 0) {
              _recurseGetCompInstance(slotItem.children ?? [])
            }
          })
      } else {
        if (jsonCodeElement?.uuid === queryId) {
          focusedCompInstanceType = jsonCodeElement
          break
        }
      }
    }
  }
  const store = useCodeStore()
  const { jsonCode } = storeToRefs(store)
  _recurseGetCompInstance(jsonCode.value)
  return focusedCompInstanceType
}
