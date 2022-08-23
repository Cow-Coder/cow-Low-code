import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import { useCodeStore } from '@/stores/code'

export default function usePreventTouch() {
  const codeStore = useCodeStore()
  const isDownSpace = ref(false)

  function onTouchEvent(e: TouchEvent) {
    if (!isDownSpace.value) e.stopPropagation()
  }

  function onChoose(data: LibraryComponentInstanceData) {
    isDownSpace.value || codeStore.dispatchFocus(data.uuid)
  }

  useEventListener(window, 'keydown', (e) => {
    if (
      (e.target as HTMLElement).nodeName === 'INPUT' ||
      (e.target as HTMLElement).nodeName === 'TEXTAREA'
    )
      return undefined
    if (e.code === 'Space') {
      isDownSpace.value = true
      e.preventDefault()
    }
  })
  useEventListener(window, 'keyup', (e) => {
    e.code === 'Space' ? (isDownSpace.value = false) : undefined
  })

  return {
    isDownSpace,
    onTouchEvent,
    onChoose,
  }
}
