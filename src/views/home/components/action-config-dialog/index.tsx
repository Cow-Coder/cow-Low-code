import { render } from 'vue'
import ActionConfigDialog from './action-config-dialog.vue'
import type { ComponentInternalInstance, VNode } from 'vue'

type context = {
  vnode: VNode
  vm: ComponentInternalInstance
  handler: {
    open: () => void
    close: () => void
  }
}

const instances: context[] = []

export function actionConfigDialog() {
  if (instances.length !== 0) {
    instances[0].handler.open()
    return undefined
  }
  const container = document.createElement('div')
  const vnode = h(ActionConfigDialog)
  render(vnode, container)
  document.body.appendChild(container)
  const vm = vnode.component!
  instances.push({
    vm,
    vnode,
    handler: {
      open: () => vm.exposed!.open(),
      close: () => vm.exposed!.close(),
    },
  })
}
