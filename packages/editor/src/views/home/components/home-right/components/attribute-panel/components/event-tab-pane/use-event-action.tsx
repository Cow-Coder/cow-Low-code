import type {
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import { actionConfigDialog } from '@/views/home/components/action-config-dialog'
import { uuid } from '@/utils/library'

export default function useEventAction() {
  const vmCurrentInstance = getCurrentInstance()

  /**
   * 给事件触发器添加动作
   * @param eventName
   * @param eventData
   */
  async function onAddEventAction(
    eventName: string,
    eventData: ValueOf<LibraryComponentInstanceEventTriggers>
  ) {
    const actionConfigResult = await actionConfigDialog(vmCurrentInstance!.appContext)
    if (!actionConfigResult) return undefined
    const actionItem = {
      actionName: actionConfigResult.actionName,
      uuid: uuid(),
    } as LibraryComponentInstanceActionItem
    if (actionConfigResult.config) actionItem.config = actionConfigResult.config
    eventData.actions.push(actionItem)
  }

  function onDeleteEventAction(
    eventName: string,
    eventData: ValueOf<LibraryComponentInstanceEventTriggers>,
    action: LibraryComponentInstanceActionItem
  ) {
    for (const index in eventData.actions) {
      if (action.uuid !== eventData.actions[index].uuid) continue
      eventData.actions.splice(Number(index), 1)
      break
    }
  }

  async function onEditEventAction(
    eventName: string,
    eventData: ValueOf<LibraryComponentInstanceEventTriggers>,
    action: LibraryComponentInstanceActionItem
  ) {
    const actionConfigResult = await actionConfigDialog(
      vmCurrentInstance!.appContext,
      action.actionName,
      action?.config
    )
    if (!actionConfigResult) return undefined
    if (actionConfigResult.config) action.config = actionConfigResult.config
  }

  return {
    onAddEventAction,
    onDeleteEventAction,
    onEditEventAction,
  }
}
