export default function usePreventDrag() {
  useEventListener(
    'dragstart',
    (e: DragEvent) => {
      if (!e.target) return undefined
      const target = e.target as HTMLElement
      const tagName = target.tagName.toLowerCase()
      if (tagName === 'img' || tagName === 'a') e.preventDefault()
    },
    { capture: true }
  )
}
