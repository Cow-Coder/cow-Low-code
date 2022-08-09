import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type { LibraryComponent } from '@/types/library-component'
import { createLibraryComponentInstance } from '@/utils/library'
import { DRAGGABLE_GROUP_NAME } from '@/constant'

/**
 * 当drop事件发生的时候，此函数的返回值会push到目标容器list中
 * @param original
 */
const onCloneCallback = (original: LibraryComponent) => {
  const data = createLibraryComponentInstance(original)
  return data
}

// 触发Move函数
const onMoveCallback = (evt: any) => {
  console.log(evt)
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
}
