import useDraggable from './use-draggable'
import type { DirectiveBinding, VNode } from 'vue'
import useResizer from '@/directive/element-dialog-resize/use-resizer'
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
    rootEl = vnode.children[0].component.subTree.children[0].el as HTMLElement
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
