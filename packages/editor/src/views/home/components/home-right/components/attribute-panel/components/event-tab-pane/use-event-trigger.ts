import { ref } from 'vue'
import { generateCustomEventTriggerName } from '@cow-low-code/utils'
import type { ExtractPropTypes } from '@vue/runtime-core'
import type { ElDialog } from 'element-plus'
import type { ComponentInternalInstance, SetupContext, WritableComputedRef } from 'vue'
import type {
  CommonEventTriggerSchemaData,
  LibraryComponentInstanceCommonEventTriggerData,
  LibraryComponentInstanceCustomEventTriggerData,
  LibraryComponentInstanceEventTriggers,
} from '@/types/event-trigger'
import type {
  createCustomAttributeTabEmits,
  createCustomAttributeTabProps,
} from '@/views/home/components/home-right/components/attribute-panel/util'
import { CUSTOM_EVENT_TRIGGER_NAME } from '@/constant'
import { uuid } from '@/utils/library'

export default function useEventTrigger(
  componentInstanceEventTriggers: WritableComputedRef<
    LibraryComponentInstanceEventTriggers | undefined
  >
) {
  const instance = getCurrentInstance()!
  const props = instance.props as Readonly<
    ExtractPropTypes<ReturnType<typeof createCustomAttributeTabProps>>
  >
  const emit = instance.emit as SetupContext<
    ReturnType<typeof createCustomAttributeTabEmits>
  >['emit']

  const componentInstanceData = useVModel(props, 'componentInstanceData', emit)

  const initExecCode = `
// 这里的代码会在对应组件setup中的一个匿名函数里执行
// 本函数有四个参数，分别是
// 1. context 一般对应setup的返回值
// 2. getCurrentInstance 对应setup中的getCurrentInstance函数实例
// 3. CUSTOM_EVENT_EMIT_NAME vue中emit的事件名。常量，目前是\`dispatchEvent\`，vue中emit的事件名
// 4. THIS_EMIT_NAME 当前事件触发器的唯一标识符


const instance = getCurrentInstance()
const props = instance.props
const emit = instance.emit`
  const customEventTriggerData = ref<
    Omit<
      LibraryComponentInstanceCustomEventTriggerData,
      keyof LibraryComponentInstanceCommonEventTriggerData
    >
  >({
    execCode: initExecCode,
    title: '',
    description: '',
  })
  const currentEditEventTriggerName = ref<string>()
  const isPopoverShow = ref(false)
  const dialogIsShowCustomEventTrigger = ref(false)
  const dialogCustomEventTriggerRef = ref<InstanceType<typeof ElDialog>>()

  watch(dialogIsShowCustomEventTrigger, (isShow) => {
    if (!isShow)
      customEventTriggerData.value = {
        execCode: initExecCode,
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

      // const dialogHeaderEl = dialogRootEl.querySelector('header.el-dialog__header')!
      // dialogRootEl.style.setProperty(
      //   '--el-dialog-header-height',
      //   `${dialogHeaderEl.getBoundingClientRect().height}px`
      // )
      //
      // const dialogFooterEl = dialogRootEl.querySelector('footer.el-dialog__footer')!
      // dialogRootEl.style.setProperty(
      //   '--el-dialog-footer-height',
      //   `${dialogFooterEl.getBoundingClientRect().height}px`
      // )

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
    componentInstanceEventTriggers.value![
      currentEditEventTriggerName.value ?? generateCustomEventTriggerName()
    ] = {
      ...customEventTriggerData.value,
      actions: currentEditEventTriggerName.value
        ? componentInstanceEventTriggers.value![currentEditEventTriggerName.value]?.actions
        : [],
    } as LibraryComponentInstanceCustomEventTriggerData

    // 修改v-for键值，强制销毁重来
    componentInstanceData.value!.indexId = uuid()
    dialogIsShowCustomEventTrigger.value = false
  }

  function onLoadDemoCustomEventTrigger() {
    customEventTriggerData.value.title = `三四击事件`
    customEventTriggerData.value.description = `连续快速三次点击触发双击事件，四击触发本事件`
    customEventTriggerData.value.execCode = `
// 这里的代码会在对应组件setup中的一个匿名函数里执行
// 本函数有四个参数，分别是
// 1. context 一般对应setup的返回值
// 2. getCurrentInstance 对应setup中的getCurrentInstance函数实例
// 3. CUSTOM_EVENT_EMIT_NAME vue中emit的事件名。常量，目前是\`dispatchEvent\`，vue中emit的事件名
// 4. THIS_EMIT_NAME 当前事件触发器的唯一标识符


const instance = getCurrentInstance()
const props = instance.props
const emit = instance.emit

function injectDispatchClick(count) {
  console.log(count)
  context.dispatchClick(count)
  if (count === 3) {
    // 激活其他事件触发器
    emit(CUSTOM_EVENT_EMIT_NAME, \`doubleClick\`)
  }
  else if (count === 4) {
    // 激活自身事件触发器
    emit(CUSTOM_EVENT_EMIT_NAME, THIS_EMIT_NAME)
  }
}
const multiClick = context.useMultiClick(injectDispatchClick, 200)
context.onClick = () => {
  multiClick()
}`
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
    currentEditEventTriggerName.value = triggerName
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
    onLoadDemoCustomEventTrigger,
  }
}
