import { render } from 'vue'
import ActionConfigDialog from './action-config-dialog.vue'
import type { ComponentInternalInstance, VNode } from 'vue'
import type { ActionConfigResult } from '@/types/library-component-event'

type context = {
  vnode: VNode
  vm: ComponentInternalInstance
  container: HTMLElement
  handler: {
    open: () => void
    close: () => void
  }
}

let instance: context | undefined = undefined

export function actionConfigDialog(): Promise<ActionConfigResult | false> {
  return new Promise((resolve) => {
    function onClose(e: ActionConfigResult | false) {
      instance ? document.body.removeChild(instance.container) : undefined
      resolve(e)
    }
    const container = document.createElement('div')
    const vnode = <ActionConfigDialog onClose={onClose} />
    render(vnode, container)
    document.body.appendChild(container)
    const vm = vnode.component!
    instance = {
      vm,
      vnode,
      container,
      handler: {
        open: () => vm.exposed!.open(),
        close: () => vm.exposed!.close(),
      },
    }
  })
}
