import type { PropType } from 'vue'
import type { AttributePanelsEnum } from '@/types/panel'
import type { LibraryComponent, LibraryComponentInstanceData } from '@/types/library-component'

/**
 * 快速生成自定义属性tab的props对象
 */
export function createCustomAttributeTabProps() {
  return {
    componentInstanceData: {
      type: Object as PropType<LibraryComponentInstanceData>,
    },
    componentSchema: {
      type: Object as PropType<LibraryComponent>,
    },
    cursorPanel: {
      type: String as PropType<AttributePanelsEnum>,
      required: true,
    },
  }
}

/**
 * 快速生成自定义属性tab的emits
 */
export function createCustomAttributeTabEmits() {
  return ['update:componentInstanceData']
}
