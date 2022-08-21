import { getCurrentInstance, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { getActionHandleDefaultProps } from '../utils/util'
import type { ExtractPropTypes, Ref } from 'vue'

export default function useMergePropsAndConfig<T>(config: Ref<T>) {
  const instance = getCurrentInstance()!
  const props = instance.props as Readonly<
    ExtractPropTypes<ReturnType<typeof getActionHandleDefaultProps>>
  >
  if (!props.actionConfig) return undefined
  const _propsConfig = cloneDeep(props.actionConfig as T)
  Object.assign(config.value, _propsConfig)
}
