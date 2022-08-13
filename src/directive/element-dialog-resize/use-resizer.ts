import { watchEffect } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import useParseTranslate from '@/directive/element-dialog-resize/use-parse-translate'

export default function useResizer(
  dialogRef: Ref<HTMLElement | undefined> | HTMLElement,
  isEnable: ComputedRef<boolean>,
  beforeMountedFun: Array<(...args: any) => any>
) {
  const dialogEl = unref(dialogRef)!

  const resizerEl = document.createElement('div')
  resizerEl.className = 'el-dialog-resizer'
  resizerEl.style.width = '15px'
  resizerEl.style.height = '15px'
  resizerEl.style.zIndex = '3000'
  resizerEl.style.background = 'transparent'
  resizerEl.style.position = 'absolute'
  resizerEl.style.bottom = '0'
  resizerEl.style.right = '0'
  resizerEl.style.cursor = 'se-resize'

  let dialogDefaultRect: DOMRect | undefined = undefined
  let resizerDefaultRect: DOMRect | undefined = undefined
  const mouseOffsetInResizer = { x: 0, y: 0 }
  let dialogDefaultTranslate: string | undefined = undefined
  function onMouseMove(ev: MouseEvent) {
    requestAnimationFrame(() => {
      const deltaWidth = ev.clientX - dialogDefaultRect!.right + mouseOffsetInResizer.x
      const deltaHeight = ev.clientY - dialogDefaultRect!.bottom + mouseOffsetInResizer.y
      const { x: translateX, y: translateY } = useParseTranslate(dialogDefaultTranslate)

      const newWidth = `${dialogDefaultRect!.width + deltaWidth}px`
      const newHeight = `${dialogDefaultRect!.height + deltaHeight}px`
      dialogEl.style.setProperty('--el-dialog-width', newWidth)
      dialogEl.style.width = newWidth
      dialogEl.style.height = newHeight
      dialogEl.style.transform = `translate(${translateX + deltaWidth / 2}px,${translateY}px)`
    })
  }

  const onMouseDown = (ev: MouseEvent) => {
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'se-resize'
    dialogDefaultRect = dialogEl.getBoundingClientRect()
    resizerDefaultRect = resizerEl.getBoundingClientRect()
    mouseOffsetInResizer.x = resizerDefaultRect.right - ev.clientX
    mouseOffsetInResizer.y = resizerDefaultRect.bottom - ev.clientY
    dialogDefaultTranslate = dialogEl.style.transform === '' ? undefined : dialogEl.style.transform

    function onMouseUp() {
      requestAnimationFrame(() => {
        dialogDefaultRect = undefined
        resizerDefaultRect = undefined
        dialogDefaultTranslate = undefined
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
      })
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onResizer = () => {
    if (resizerEl && dialogEl) {
      resizerEl.addEventListener('mousedown', onMouseDown)
      dialogEl.appendChild(resizerEl)
    }
  }

  const offResizer = () => {
    if (resizerEl && dialogEl) {
      resizerEl.removeEventListener('mousedown', onMouseDown)
      dialogEl.removeChild(resizerEl)
    }
  }

  watchEffect(() => {
    if (isEnable.value) {
      onResizer()
    } else {
      offResizer()
    }
  })

  beforeMountedFun.push(offResizer)
}
