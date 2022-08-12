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
      type: Object as PropType<Record<string, LibraryComponent>>,
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

/**
 * 将LibraryComponentSchema.libraryPanelShowDetail.title属性混入libraryComponentSchemaMap.label中
 * @param libraryComponentSchemaMap
 * @param libraryComponentInstanceTree
 */
export function mixLibraryComponentInstanceDataWidthLibraryComponentSchemaLabel(
  libraryComponentSchemaMap: Record<string, LibraryComponent>,
  libraryComponentInstanceTree: LibraryComponentInstanceData[]
) {
  type ProxyLibraryComponentInstanceData = LibraryComponentInstanceData & {
    /**
     * 组件中文名，对应LibraryComponent.libraryPanelShowDetail.title
     */
    label: string
  }
  function proxyGet(target: Record<any, any>, property: any): any {
    if (property === 'label') {
      return libraryComponentSchemaMap![(target as LibraryComponentInstanceData).componentName]
        .libraryPanelShowDetail.title
    } else if (target[property] === undefined) return undefined
    else if (typeof target[property] !== 'object') return target[property]
    else return new Proxy(target[property], { get: proxyGet })
  }
  return new Proxy(libraryComponentInstanceTree!, {
    get: proxyGet,
  }) as ProxyLibraryComponentInstanceData[]
}
