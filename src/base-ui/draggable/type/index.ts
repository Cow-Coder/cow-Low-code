import type { DefineComponent } from 'vue'

export type groupType = {
  name?: string
  pull?: string
  put?: boolean
}

export type IDraggableItem<T> = {
  group?: groupType
  itemKey?: string
  sort?: boolean
  disabled?: boolean
}

export interface IDraggable<T = any> {
  draggableProp: IDraggableItem<T>
  // itemSlot: DefineComponent,
  handleChangeF?: (env: any) => any
  handleCloneF?: (component: any) => any
}
