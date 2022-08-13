import useDraggable from './use-draggable'
import type { DirectiveBinding } from 'vue'
import useResizer from '@/directive/element-dialog-resize/use-resizer'

const beforeMountedFun: Array<(...args: any) => any> = []

/**
 * element-plus dialog组件大小缩放功能
 * @example
 *   <div v-element-dialog-resize="{ draggable: true }">
 *     <el-dialog v-model="dialogVisible" title="Tips" width="30%">
 *     </el-dialog>
 *   </div>
 */
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    nextTick(() => {
      const dialogEl: HTMLElement = document.querySelector('div.el-dialog')!
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
  },
  beforeUnmount() {
    for (const fun of beforeMountedFun) {
      if (typeof fun === 'function') {
        fun()
      }
    }
  },
}
