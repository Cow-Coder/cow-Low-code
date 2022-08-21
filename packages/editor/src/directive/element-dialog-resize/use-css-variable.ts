import { addUnit } from '@/directive/element-dialog-resize/use-draggable'

export default function useCssVariable(dialogEl: HTMLElement) {
  const dialogHeaderEl: HTMLElement = dialogEl.querySelector('header.el-dialog__header')!
  {
    const dialogHeaderRect = useElementBounding(dialogHeaderEl)
    watch(
      () => dialogHeaderRect.height,
      (height) => {
        requestAnimationFrame(() =>
          dialogEl.style.setProperty('--el-dialog-header-height', addUnit(height.value)!)
        )
      },
      { immediate: true }
    )
  }

  const dialogFooterEl: HTMLElement | null = dialogEl.querySelector('footer.el-dialog__footer')
  if (dialogFooterEl) {
    const dialogFooterRect = useElementBounding(dialogFooterEl)
    watch(
      () => dialogFooterRect.height,
      (height) => {
        requestAnimationFrame(() =>
          dialogEl.style.setProperty('--el-dialog-footer-height', addUnit(height.value)!)
        )
      },
      { immediate: true }
    )
  }

  const dialogRect = useElementBounding(dialogEl)
  watch(
    () => reactive([dialogRect.width.value, dialogRect.height.value]),
    ([width, height]) => {
      requestAnimationFrame(() => {
        dialogEl.style.setProperty('--el-dialog-width', addUnit(width)!)
        dialogEl.style.setProperty('--el-dialog-height', addUnit(height)!)
      })
    },
    { immediate: true, deep: true }
  )
}
