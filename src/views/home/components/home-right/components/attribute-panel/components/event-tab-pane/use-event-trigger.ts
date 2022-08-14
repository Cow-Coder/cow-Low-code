import { ref } from 'vue'
import type { ElDialog } from 'element-plus'
import type { ComponentInternalInstance, WritableComputedRef } from 'vue'
import type {
  CommonEventTriggerSchemaData,
  LibraryComponentInstanceCommonEventTriggerData,
  LibraryComponentInstanceCustomEventTriggerData,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'
import { generateCustomEventTriggerName } from '@/views/home/components/home-right/components/attribute-panel/components/event-tab-pane/util'

export default function useEventTrigger(
  componentInstanceEventTriggers: WritableComputedRef<
    LibraryComponentInstanceEventTriggers | undefined
  >
) {
  const customEventTriggerData = ref<
    Omit<
      LibraryComponentInstanceCustomEventTriggerData,
      keyof LibraryComponentInstanceCommonEventTriggerData
    >
  >({
    execCode: '',
    title: '',
    description: '',
  })
  const isPopoverShow = ref(false)
  const dialogIsShowCustomEventTrigger = ref(false)
  const dialogCustomEventTriggerRef = ref<InstanceType<typeof ElDialog>>()

  watch(dialogIsShowCustomEventTrigger, (isShow) => {
    if (!isShow)
      customEventTriggerData.value = {
        execCode: '',
        title: '',
        description: '',
      }
  })

  /**
   * 让dialog中的Monaco自适应大小
   */
  const unwatchDialogCustomEventTriggerRef = watch(
    () => dialogCustomEventTriggerRef.value?.dialogContentRef,
    (val) => {
      const dialogRootEl: HTMLElement = (val.$ as ComponentInternalInstance).vnode.el as any

      const dialogHeaderEl = dialogRootEl.querySelector('header.el-dialog__header')!
      dialogRootEl.style.setProperty(
        '--el-dialog-header-height',
        `${dialogHeaderEl.getBoundingClientRect().height}px`
      )

      const dialogFooterEl = dialogRootEl.querySelector('footer.el-dialog__footer')!
      dialogRootEl.style.setProperty(
        '--el-dialog-footer-height',
        `${dialogFooterEl.getBoundingClientRect().height}px`
      )

      const dialogBodyEl: HTMLDivElement = dialogRootEl.querySelector('div.el-dialog__body')!
      dialogBodyEl.style.height =
        'calc(var(--el-dialog-height) - var(--el-dialog-header-height) - var(--el-dialog-footer-height) - var(--el-dialog-padding-primary) * 2)'
      dialogBodyEl.style.display = 'flex'
      dialogBodyEl.style.flexDirection = 'column'
      unwatchDialogCustomEventTriggerRef()
    }
  )

  /**
   * dialog提交，添加自定义时间触发器
   */
  function onSubmitCustomEventTrigger() {
    if (customEventTriggerData.value.title === '') customEventTriggerData.value.title = '自定义事件'
    componentInstanceEventTriggers.value![generateCustomEventTriggerName()] = {
      ...customEventTriggerData.value,
      actions: [],
    } as LibraryComponentInstanceCustomEventTriggerData
    dialogIsShowCustomEventTrigger.value = false
  }

  /**
   * 编辑自定义事件触发器
   * @param triggerName
   * @param triggerData
   */
  function editCustomEventTrigger(
    triggerName: string,
    triggerData: LibraryComponentInstanceCustomEventTriggerData
  ) {
    customEventTriggerData.value.description = triggerData.description
    customEventTriggerData.value.title = triggerData.title
    customEventTriggerData.value.execCode = triggerData.execCode
    dialogIsShowCustomEventTrigger.value = true
  }

  /**
   * 添加事件触发器
   * @param eventName
   * @param eventSchema
   */
  function onAddEventTrigger(eventName: string, eventSchema: CommonEventTriggerSchemaData) {
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
    customEventTriggerData,
    dialogIsShowCustomEventTrigger,
    dialogCustomEventTriggerRef,
    isPopoverShow,
    onAddEventTrigger,
    onDeleteEventTrigger,
    editCustomEventTrigger,
    onSubmitCustomEventTrigger,
  }
}
