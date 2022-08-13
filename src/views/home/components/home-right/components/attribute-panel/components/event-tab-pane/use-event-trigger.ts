import { ref } from 'vue'
import type { ElDialog } from 'element-plus'
import type { ComponentInternalInstance, WritableComputedRef } from 'vue'
import type {
  CommonEventTriggerData,
  LibraryComponentInstanceCommonEventTriggerData,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'

export default function useEventTrigger(
  componentInstanceEventTriggers: WritableComputedRef<
    LibraryComponentInstanceEventTriggers | undefined
  >
) {
  const isPopoverShow = ref(false)
  const dialogIsShowCustomEventTrigger = ref(false)
  const dialogCustomEventTriggerRef = ref<InstanceType<typeof ElDialog>>()
  const unwatchDialogCustomEventTriggerRef = watch(
    () => dialogCustomEventTriggerRef.value?.dialogContentRef,
    (val) => {
      const dialogRootEl: HTMLElement = (val.$ as ComponentInternalInstance).vnode.el as any
      const dialogHeaderEl = dialogRootEl.querySelector('header.el-dialog__header')!
      dialogRootEl.style.setProperty(
        '--el-dialog-header-height',
        `${dialogHeaderEl.getBoundingClientRect().height}px`
      )
      const dialogBodyEl: HTMLDivElement = dialogRootEl.querySelector('div.el-dialog__body')!
      dialogBodyEl.style.height =
        'calc(var(--el-dialog-height) - var(--el-dialog-header-height) - var(--el-dialog-padding-primary) * 2)'
      unwatchDialogCustomEventTriggerRef()
    }
  )

  /**
   * 添加事件触发器
   * @param eventName
   * @param eventSchema
   */
  function onAddEventTrigger(eventName: string, eventSchema: CommonEventTriggerData) {
    isPopoverShow.value = false
    if (!componentInstanceEventTriggers.value)
      throw new TypeError(`componentInstanceEventTriggers 不能是 undefined`)
    if (eventName !== CUSTOM_EVENT_TRIGGER_NAME) {
      componentInstanceEventTriggers.value[eventName] = {
        actions: [],
      } as LibraryComponentInstanceCommonEventTriggerData
      return undefined
    }
    dialogIsShowCustomEventTrigger.value = true
  }

  /**
   * 删除事件触发器
   * @param eventName
   * @param eventData
   */
  function onDeleteEventTrigger(
    eventName: string,
    eventData: ValueOf<LibraryComponentInstanceEventTriggers>
  ) {
    delete componentInstanceEventTriggers.value![eventName]
  }

  return {
    dialogIsShowCustomEventTrigger,
    dialogCustomEventTriggerRef,
    isPopoverShow,
    onAddEventTrigger,
    onDeleteEventTrigger,
  }
}
