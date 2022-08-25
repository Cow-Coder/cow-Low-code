import { render } from 'vue'
import type { LibraryComponent } from '@cow-low-code/types/src/library-component'
import { useCodeStore } from '@/stores/code'

export default function useDragPreview() {
  const editCanvasRef = ref<HTMLElement>()
  const store = useCodeStore()
  const { draggedElement } = storeToRefs(store)

  // 当前ghost根元素
  let ghostStash: undefined | HTMLElement = undefined
  // 用于替换默认ghost的物料组件渲染容器
  let ghostLibraryComponentContainer: undefined | HTMLElement = undefined
  const instance = getCurrentInstance()!
  watch(draggedElement, (el) => {
    if (!editCanvasRef.value) return undefined
    if (!el && ghostStash && ghostLibraryComponentContainer) {
      // drop时刻，el为undefined
      ;(ghostStash.children[0] as HTMLElement).style.display = ''
      // 兼容容器组件。容器组件在拖拽时刻暂时没有渲染出真实组件
      if (ghostStash.children.length === 1) return undefined
      ghostStash.removeChild(ghostLibraryComponentContainer)
    }
    if (el?.widgetType === 'container') return undefined

    const ghost: HTMLElement | null = editCanvasRef.value.querySelector(
      '.edit-canvas-sortable-ghost'
    )
    if (!ghost) return undefined
    ;(ghost.children[0] as HTMLElement).style.display = 'none'
    ghostLibraryComponentContainer = document.createElement('div')
    const libraryComponent = toRaw(draggedElement.value) as LibraryComponent
    const vnode = h(libraryComponent)
    vnode.appContext = instance.appContext
    render(vnode, ghostLibraryComponentContainer)
    ghost.appendChild(ghostLibraryComponentContainer)
    ghostStash = ghost
  })

  return {
    editCanvasRef,
  }
}
