import type { LibraryComponent, LibraryComponentInstanceData } from '@cow-code-low-code/types'
import type { PropType } from 'vue'

export function getActionHandleDefaultProps<T>() {
  return {
    actionConfig: {
      type: Object as PropType<T>,
    },
    libraryComponentInstanceTree: {
      type: Object as PropType<LibraryComponentInstanceData[]>,
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
  }
}
