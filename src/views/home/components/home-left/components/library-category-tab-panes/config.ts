import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type { LibraryComponent } from '@/types/library-component'
import { createLibraryComponentInstance } from '@/utils/library'
import { DRAGGABLE_GROUP_NAME } from '@/constant'
import { useCodeStore } from '@/stores/code'

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
  // 给组件大纲赋值
  store.addOutlineData({
    name: element.name,
    title: element.libraryPanelShowDetail.title,
    tabName: element.tabName,
  })
}

// 触发End函数【拖拽结束】
const onEndCallback = () => {
  const store = useCodeStore()
  store.removeDraggedElement()
}

const log = function (evt: any) {
  window.console.log(evt)
  console.log('change：', evt)
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
  handleChange: log,
  handleEnd: onEndCallback,
}
