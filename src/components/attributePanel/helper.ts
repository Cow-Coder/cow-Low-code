import type { PropType } from 'vue'
import type { ILibraryComponentInstanceData } from '@/components/editPanel/types'
import type { EAttributePanels } from '@/components/attributePanel/types'
import type { ILibraryComponent } from '@/library/types'

export function createCustomAttributeTabProps() {
  return {
    componentInstanceData: {
      type: Object as PropType<ILibraryComponentInstanceData>,
    },
    componentSchema: {
      type: Object as PropType<ILibraryComponent>,
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
