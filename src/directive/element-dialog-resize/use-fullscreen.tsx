import { render } from 'vue'
import IconFullScreen from '~icons/ep/full-screen'
import IconClose from '~icons/ep/close'

export default function useFullscreen(dialogEl: HTMLElement, dialogVnode: any) {
  function onToggleFullScreen() {
    dialogVnode.props.fullscreen = !dialogVnode.props.fullscreen
  }
  function onCloseDialog() {
    dialogVnode.props.modelValue = false
  }

  const dialogHeaderEl: HTMLElement = dialogEl.querySelector('header.el-dialog__header')!
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
  style.innerHTML =
    '.el-dialog.is-fullscreen {--el-dialog-width: 100%!important;width:100%!important;height:100%!important;}'
  document.querySelector('head')!.appendChild(style)
}
