import { render } from 'vue'
import { cloneDeep } from 'lodash-es'
import ActionConfigDialog from './action-config-dialog.vue'
import type { AppContext, ComponentInternalInstance, VNode } from 'vue'
import type { ActionConfigResult } from './types'

type context = {
  vnode: VNode
  vm: ComponentInternalInstance
  container: HTMLElement
}

let instance: context | undefined = undefined

export function actionConfigDialog(
  context: AppContext,
  actionName?: string,
  actionConfig?: any
): Promise<ActionConfigResult | false> {
  const actionConfig_ = actionConfig ? cloneDeep(actionConfig) : undefined
  return new Promise((resolve) => {
    function onClose(e: ActionConfigResult | false) {
      instance ? document.body.removeChild(instance.container) : undefined
      resolve(e)
    }
    const container = document.createElement('div')
    const props = {} as Record<string, any>
    if (actionName) props.actionName = actionName
    if (actionConfig_) props.actionConfig = actionConfig_
    const vnode = <ActionConfigDialog {...props} onClose={onClose} />
    vnode.appContext = context
    render(vnode, container)
    document.body.appendChild(container)
    const vm = vnode.component!
    instance = {
      vm,
      vnode,
      container,
    }
  })
}
