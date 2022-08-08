export type cloneType = (original: any) => any

export type groupType = {
  name?: string
  pull?: string
  put?: boolean
}

export type IDraggableItem = {
  group?: groupType
  itemKey?: string
  sort?: boolean
  disabled?: boolean
  handleClone?: cloneType
  libraryClass?: boolean
}

export interface IDraggable {
  draggableProp: IDraggableItem
  // itemSlot: DefineComponent,
  handleChangeF?: (component: any) => any
}
