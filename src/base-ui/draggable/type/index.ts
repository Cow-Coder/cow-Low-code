export type cloneType = (original: any) => any

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
  handleClone?: cloneType
  libraryClass?: boolean
}

export interface IDraggable<T = any> {
  draggableProp: IDraggableItem<T>
  // itemSlot: DefineComponent,
  handleChangeF?: (component: any) => any
}
