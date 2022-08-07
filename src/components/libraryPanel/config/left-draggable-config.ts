import type { IDraggable } from '@/base-ui/draggable'
import type { ILibraryComponent } from '@/library/types'
import { createLibraryComponentInstance } from '@/utils/library'

/**
 * 当drop事件发生的时候，此函数的返回值会push到目标容器list中
 * @param original
 */
const onCloneCallback = (original: ILibraryComponent) => {
  const data = createLibraryComponentInstance(original)
  return data
}

const log = function (evt: any) {
  window.console.log(evt)
  console.log('change：', evt)
}

export const leftDraggableConfig: IDraggable = {
  draggableProp: {
    group: { name: 'library', pull: 'clone', put: false },
    sort: false,
    itemKey: 'id',
    libraryClass: true,
    handleClone: onCloneCallback,
  },
  handleChangeF: log,
}
