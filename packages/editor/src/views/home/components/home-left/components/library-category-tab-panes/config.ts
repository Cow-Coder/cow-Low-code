import { cloneDeep } from 'lodash-es'
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type {
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
  LibraryComponentProps,
} from '@/types/library-component'
import { uuid } from '@/utils/library'
import { DRAGGABLE_GROUP_NAME } from '@/constant'
import { useCodeStore } from '@/stores/code'

/**
 * 生成组件实例props
 * @param props
 */
function createLibraryComponentInstanceProps(
  props: LibraryComponentProps
): LibraryComponentInstanceProps {
  const _props = cloneDeep(props)
  const result = {} as LibraryComponentInstanceProps
  Object.entries(_props).forEach(([propKey, propSchema]) => {
    if (propSchema.default) result[propKey] = propSchema.default
  })
  return result
}

/**
 * 从物料组件克隆一个组件实例
 * @param com
 */
function createLibraryComponentInstance(com: LibraryComponent): LibraryComponentInstanceData {
  const data = {
    indexId: uuid(),
    uuid: uuid(),
    componentName: com.name,
    libraryName: com.libraryName,
    focus: false,
    eventTriggers: {},
  } as LibraryComponentInstanceData
  if (com.props) data.props = createLibraryComponentInstanceProps(com.props)
  if (com.eventTriggers) data.eventTriggers = {}

  return data
}

/**
 * 当drop事件发生的时候，此函数的返回值会push到目标容器list中
 * @param original
 */
const onCloneCallback = (original: LibraryComponent) => {
  return createLibraryComponentInstance(original)
}

// 触发Move函数【移到画布】
const onMoveCallback = (evt: any) => {
  const store = useCodeStore()
  const { draggedElement } = storeToRefs(store)

  // 没有被拖拽的值才加载【使其只赋值一次】
  if (draggedElement.value) return

  const element = evt.draggedContext.element
  // 给被拖拽的组件赋值
  store.updateDraggedElement(element)
}

// 触发End函数【拖拽结束】
const onEndCallback = () => {
  const store = useCodeStore()
  store.removeDraggedElement()
}

export const leftDraggableConfig: Draggable = {
  draggableProp: {
    group: { name: DRAGGABLE_GROUP_NAME, pull: 'clone', put: false },
    sort: false,
    itemKey: 'id',
    libraryClass: true,
    handleClone: onCloneCallback,
    handleMove: onMoveCallback,
  },
  handleEnd: onEndCallback,
}
