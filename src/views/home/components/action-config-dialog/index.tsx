import { getCurrentInstance, render } from 'vue'
import { cloneDeep } from 'lodash-es'
import ActionConfigDialog from './action-config-dialog.vue'
import type { AppContext, ComponentInternalInstance, VNode } from 'vue'
import type { ActionConfigResult } from '@/types/library-component-event'
import type { LibraryComponent, LibraryComponentInstanceData } from '@/types/library-component'

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
    const vnode = h(ActionConfigDialog, {
      ...props,
      onClose,
    })
    vnode.appContext = context
    // <ActionConfigDialog {...props} onClose={onClose} />
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
