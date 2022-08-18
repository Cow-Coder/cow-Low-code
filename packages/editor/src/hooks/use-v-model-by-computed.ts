import type { WritableComputedRef } from 'vue'

type RecordKey = string | number | symbol

/**
 * TODO: 自动类型推断写不出来，必须手动指定返回类型
 * @param data
 * @param key
 */
export function useVModelByComputed<
  R,
  K extends RecordKey = RecordKey,
  T extends Record<RecordKey, any> | undefined = Record<RecordKey, any> | undefined
>(data: T, key: K): WritableComputedRef<R | undefined> {
  return computed({
    get() {
      if (!data) return undefined
      return data[key]
    },
    set(val) {
      if (!data) return undefined
      data[key] = val
    },
  })
}
