import useDraggable from './use-draggable'
import useResizer from './use-resizer'
import useFullscreen from './use-fullscreen'
import type { DirectiveBinding } from 'vue'
import { isArray } from '@/utils/type'

const beforeMountedFun: Array<(...args: any) => any> = []

let rootEl: HTMLElement | undefined = undefined
function handle(el: HTMLElement, binding: DirectiveBinding, vnode: any) {
  if (
    !(
      isArray(vnode.children) &&
      (vnode.children[0] as any)?.props?.modelValue &&
      (vnode.children[0] as any)?.component?.subTree?.children[0].el
    )
  )
    return undefined
  nextTick(() => {
    if (rootEl) return undefined
    const dialogVnode = vnode.children[0].component
    rootEl = vnode.children[0].component.subTree.children[0].el as HTMLElement
    const dialogOverlay: HTMLElement = rootEl.querySelector('.el-overlay-dialog')!
    // 隐藏element这个奇怪设计导致拉伸太大而出现滚动条
    dialogOverlay.style.overflow = 'hidden'
    const dialogEl: HTMLElement = rootEl.querySelector('div.el-dialog')!
    dialogEl.style.display = 'flex'
    dialogEl.style.flexDirection = 'column'
    const dialogBodyEl: HTMLElement = dialogEl.querySelector('.el-dialog__body')!
    dialogBodyEl.style.flexGrow = '1'
    const dialogHeaderEl: HTMLElement = dialogEl.querySelector('header.el-dialog__header')!

    const isEnableResizer = computed(() => true)
    const isDraggable = computed(() => binding.value?.draggable ?? false)
    useResizer(dialogEl, isEnableResizer, beforeMountedFun)
    useDraggable(dialogEl, dialogHeaderEl, isDraggable, beforeMountedFun)
    if (binding.value?.fullscreen) useFullscreen(dialogEl, dialogVnode)
  })
}

/**
 * element-plus dialog组件大小缩放功能
 * @param draggable Boolean
 * @example
 *   <div v-element-dialog-resize="{ draggable: true }">
 *     <el-dialog v-model="dialogVisible" title="Tips" width="30%">
 *     </el-dialog>
 *   </div>
 */
export default {
  mounted: handle,
  updated: handle,
  beforeUnmount() {
    for (const fun of beforeMountedFun) {
      if (typeof fun === 'function') {
        fun()
      }
    }
  },
}
