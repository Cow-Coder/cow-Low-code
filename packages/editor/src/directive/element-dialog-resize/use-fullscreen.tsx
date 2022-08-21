import { render } from 'vue'
import IconFullScreen from '~icons/ep/full-screen'
import IconClose from '~icons/ep/close'

export default function useFullscreen(dialogEl: HTMLElement, dialogVnode: any) {
  const dialogHeaderEl: HTMLElement = dialogEl.querySelector('header.el-dialog__header')!
  let allowDraggable = false
  let widthBeforeFullscreen: number | undefined = undefined
  function onToggleFullScreen() {
    if (dialogEl.className.includes('is-draggable')) allowDraggable = true
    if (!dialogVnode.props.fullscreen) {
      // 准备切换全屏，记录当前宽度
      widthBeforeFullscreen = dialogHeaderEl.getBoundingClientRect().width
    }
    if (dialogVnode.props.fullscreen) {
      if (!widthBeforeFullscreen) return undefined
      // 准备缩小，恢复记录的宽度
      dialogEl.style.setProperty('--el-dialog-width', `${widthBeforeFullscreen}px`)
      dialogEl.style.width = `${widthBeforeFullscreen}px`
      widthBeforeFullscreen = undefined
    }
    dialogVnode.props.fullscreen = !dialogVnode.props.fullscreen
    if (!dialogVnode.props.fullscreen && allowDraggable) {
      // 从全屏变回窗口，要加上 is-draggable
      nextTick(() => {
        dialogEl.className = `${dialogEl.className} is-draggable`
      })
    }
  }
  function onCloseDialog() {
    dialogVnode.props.modelValue = false
  }

  const dialogHeaderButtonEl: HTMLElement | null =
    dialogHeaderEl.querySelector('.el-dialog__headerbtn')
  if (dialogHeaderButtonEl) {
    dialogHeaderEl.removeChild(dialogHeaderButtonEl)
  }
  const customDialogHeaderButtonEl = document.createElement('div')
  customDialogHeaderButtonEl.className = 'el-dialog__headerbtn'
  customDialogHeaderButtonEl.style.display = 'flex'
  customDialogHeaderButtonEl.style.alignItems = 'center'
  customDialogHeaderButtonEl.style.width = 'auto'
  customDialogHeaderButtonEl.style.marginRight = '20px'

  const iconFullscreenContainer = document.createElement('div')
  const iconFullscreenVnode = <IconFullScreen onClick={onToggleFullScreen} />
  render(iconFullscreenVnode, iconFullscreenContainer)
  customDialogHeaderButtonEl.appendChild(iconFullscreenContainer)

  const iconCloseContainer = document.createElement('div')
  iconCloseContainer.style.marginLeft = '20px'
  const iconCloseVnode = <IconClose onClick={onCloseDialog} />
  render(iconCloseVnode, iconCloseContainer)
  customDialogHeaderButtonEl.appendChild(iconCloseContainer)

  dialogHeaderEl.appendChild(customDialogHeaderButtonEl)

  // 加入覆盖样式
  const style = document.createElement('style')
  style.type = 'text/css'
  // --el-dialog-width: 100%!important;
  style.innerHTML = '.el-dialog.is-fullscreen {width:100%!important;height:100%!important;}'
  document.querySelector('head')!.appendChild(style)
}
