export type CloneDrag = (original: any) => any
export type MoveDrag = (evt: any) => any

export type GroupDrag = {
  name?: string
  pull?: string
  put?: boolean
}

export type DraggableProps = {
  group?: GroupDrag
  itemKey?: string
  sort?: boolean
  disabled?: boolean
  handleClone?: CloneDrag
  handleMove?: MoveDrag
  handleEnd?: MoveDrag
  libraryClass?: boolean
  [key: string]: any
}

export interface Draggable {
  draggableProp: DraggableProps
  // itemSlot: DefineComponent,
  handleChange?: (component: any) => any
  handleEnd?: () => unknown
}
