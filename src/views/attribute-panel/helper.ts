import type { PropType } from 'vue'
import type { LibraryComponentInstanceData } from '@/views/edit-panel/types'
import type { EAttributePanels } from '@/views/attribute-panel/types'
import type { LibraryComponent } from '@/library/types'

export function createCustomAttributeTabProps() {
  return {
    componentInstanceData: {
      type: Object as PropType<LibraryComponentInstanceData>,
    },
    componentSchema: {
      type: Object as PropType<LibraryComponent>,
    },
    cursorPanel: {
      type: String as PropType<EAttributePanels>,
      required: true,
    },
  }
}

export function createCustomAttributeTabEmits() {
  return ['update:componentInstanceData']
}
