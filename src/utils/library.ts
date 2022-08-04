import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import type {
  ILibraryComponent,
  ILibraryComponentPropItem,
  ILibraryComponentProps,
} from '@/library/types'
import type {
  ILibraryComponentInstanceData,
  ILibraryComponentInstanceProps,
} from '@/components/editPanel/types'

export const uuid = uuidv4

/**
 * 从物料组件克隆一个组件实例
 * @param com
 */
export function createLibraryComponentInstance(
  com: ILibraryComponent
): ILibraryComponentInstanceData {
  const data = {
    uuid: uuid(),
    componentName: com.name,
    libraryName: com.libraryName,
    focus: false,
  }
  if (com.props) {
    Object.assign(data, {
      props: createLibraryComponentInstanceProps(com.props),
    })
  }
  return data
}

/**
 * 生成组件实例props
 * @param props
 */
export function createLibraryComponentInstanceProps(
  props: ILibraryComponentProps
): ILibraryComponentInstanceProps {
  const _props = cloneDeep(props)
  const result = {} as ILibraryComponentInstanceProps
  Object.entries(_props).forEach(([propKey, propSchema]) => {
    if (propSchema.default) result[propKey] = propSchema.default
  })
  return result
}

/**
 * 快速定义物料组件
 * @param com
 */
export function defineLibraryComponent(com: ILibraryComponent) {
  return com
}

/**
 * 快速创建物料组件的一个prop
 * @param data
 */
export function createLibraryComponentPropItem(data: ILibraryComponentPropItem) {
  return data
}
