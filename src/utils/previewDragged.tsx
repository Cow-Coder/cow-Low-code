import type { LibraryComponent } from '@/types/library-component'
import type { PropType } from 'vue'
import { useCodeStore } from '@/stores/code'

export function previewDragged(element?: LibraryComponent) {
  if (element) return <element></element>
}

export default defineComponent({
  name: 'PreviewDragged',
  props: {
    element: {
      type: Object as PropType<LibraryComponent>,
      default: undefined,
    },
  },
  setup(props) {
    return () => markRaw(toRaw(<>{previewDragged(props.element)}</>))
  },
})
