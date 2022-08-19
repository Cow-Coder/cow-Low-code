import { watchEffect } from 'vue'
import { isNumber, isString } from 'lodash-es'
import type { ComputedRef, Ref } from 'vue'
import useParseTranslate from '@/directive/element-dialog-resize/use-parse-translate'

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return ''
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return `${value}${defaultUnit}`
  }
}

const useDraggable = (
  targetRef: Ref<HTMLElement | undefined> | HTMLElement,
  dragRef: Ref<HTMLElement | undefined> | HTMLElement,
  draggable: ComputedRef<boolean>,
  beforeMountedFun: Array<(...args: any) => any>
) => {
  const targetRef_ = unref(targetRef)!
  const dragRef_ = unref(dragRef)!

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX
    const downY = e.clientY
    const { x: offsetX, y: offsetY } = useParseTranslate(targetRef_!.style.transform)

    const targetRect = targetRef_!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    const onMousemove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft)
        const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop)

        targetRef_!.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`
      })
    }

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  const onDraggable = () => {
    if (dragRef_ && targetRef_) {
      targetRef_.className = `${targetRef_.className} is-draggable`
      dragRef_.addEventListener('mousedown', onMousedown)
    }
  }

  const offDraggable = () => {
    if (dragRef_ && targetRef_) {
      targetRef_.className = targetRef_.className.replace('is-draggable', '')
      dragRef_.removeEventListener('mousedown', onMousedown)
    }
  }

  watchEffect(() => {
    if (draggable.value) {
      onDraggable()
    } else {
      offDraggable()
    }
  })

  beforeMountedFun.push(offDraggable)
}
export default useDraggable
