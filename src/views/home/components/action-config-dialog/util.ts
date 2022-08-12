import type { PropType } from 'vue'
import type { LibraryComponent, LibraryComponentInstanceData } from '@/types/library-component'
import type { ActionHandlerSchema } from '@/views/home/components/action-config-dialog/types'

export function getActionHandleDefaultProps<T>() {
  return {
    actionConfig: {
      type: Object as PropType<T>,
    },
    libraryComponentInstanceTree: {
      type: Object as PropType<LibraryComponentInstanceData[]>,
      required: true,
    },
    focusedLibraryComponentInstanceData: {
      type: Object as PropType<LibraryComponentInstanceData>,
      required: true,
    },
    libraryComponentSchemaMap: {
      type: Object as PropType<LibraryComponent[]>,
      required: true,
    },
  }
}

/**
 * 定义一个动作处理器
 * @param action
 */
export function defineActionHandler<T>(action: ActionHandlerSchema<T>) {
  return action
}
