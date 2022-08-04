import type { WritableComputedRef } from "vue";

type IRecordKey = string | number | symbol;

/**
 * TODO: 自动类型推断写不出来，必须手动指定返回类型
 * @param data
 * @param key
 */
export function useVModelByComputed<
  R,
  K extends IRecordKey = IRecordKey,
  T extends Record<IRecordKey, any> | undefined =
    | Record<IRecordKey, any>
    | undefined
>(data: T, key: K): WritableComputedRef<R | undefined> {
  return computed({
    get() {
      if (!data) return undefined;
      return data[key];
    },
    set(val) {
      if (!data) return undefined;
      data[key] = val;
    },
  });
}
