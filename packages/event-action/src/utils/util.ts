import { isArray, isObject } from 'lodash-es'
import type { ComponentPublicInstance, PropType } from 'vue'
import type {
  ActionHandlerSchema,
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentsInstanceTree,
} from '@cow-low-code/types'

export function parseActionChildren(modules: Record<string, ActionHandlerSchema>) {
  return Object.entries(modules)
    .map(([, module]) => module)
    .sort((a, b) => {
      if (!a?.order || !b?.order) return 0
      return a?.order - b?.order
    })
}

export function getActionHandleDefaultProps<T>() {
  return {
    actionConfig: {
      type: Object as PropType<T>,
    },
    libraryComponentInstanceTree: {
      type: Object as PropType<LibraryComponentsInstanceTree>,
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
    monacoEditorComponent: {
      type: Object,
    },
    libraryComponentInstanceRefMap: {
      type: Object as PropType<Map<string, ComponentPublicInstance>>,
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
  libraryComponentInstanceTree: LibraryComponentsInstanceTree
) {
  type ProxyLibraryComponentInstanceData = {
    /**
     * 组件中文名，对应LibraryComponent.libraryPanelShowDetail.title
     */
    label: string
    children?: ProxyLibraryComponentInstanceData
    uuid: string
  }
  function proxyGet(target: any, property: any): any {
    if (isArray(target) || property === 'children') {
      if (isObject(target[property]) || isArray(target[property]))
        return new Proxy(target[property], { get: proxyGet })
      else return target[property]
    }

    if (property === 'label') {
      return libraryComponentSchemaMap![(target as LibraryComponentInstanceData).componentName]
        .libraryPanelShowDetail.title
    } else if (property === 'uuid') return target[property]
    else return undefined
  }
  return new Proxy(libraryComponentInstanceTree, {
    get: proxyGet,
  }) as unknown as ProxyLibraryComponentInstanceData[]
}
