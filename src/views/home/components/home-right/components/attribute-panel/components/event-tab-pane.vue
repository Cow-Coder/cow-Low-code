<template>
  <div class="event-tab__container">
    <div v-if="componentInstanceData" class="event-tab__wrapper">
      <a-collapse
        v-if="
          componentInstanceEventTriggers && Object.entries(componentInstanceEventTriggers).length
        "
        v-model:active-key="collapseActiveKey"
        class="event-tab__collapse"
        :bordered="false"
        expand-icon-position="right"
      >
        <a-collapse-item
          v-for="(eventTriggerData, eventTriggerName) in componentInstanceEventTriggers"
          :key="eventTriggerName"
          :header="eventTriggersSchema[eventTriggerName].title"
        >
          <template #extra>
            <div class="flex">
              <a-space>
                <icon-plus
                  class="icon-button"
                  theme="outline"
                  size="16"
                  @click.capture.stop="onAddEventAction(eventTriggerName, eventTriggerData)"
                />
                <icon-delete
                  class="icon-button"
                  theme="outline"
                  size="16"
                  @click.capture.stop="onDeleteEventTrigger(eventTriggerName, eventTriggerData)"
                />
              </a-space>
            </div>
          </template>
          <draggable
            v-model="eventTriggerData.actions"
            handle=".action-item__drag-handle"
            item-key="actionName"
            group="dragHandle"
          >
            <template #item="{ element: action }">
              <div class="action-item">
                <div class="action-item__header">
                  <div class="action-item__left">
                    <icon-drag
                      class="action-item__drag-handle"
                      theme="outline"
                      size="18"
                      fill="#333"
                      :stroke-width="2"
                    />
                    <div class="action-item__title">
                      {{ parseActionLabelAndTip(action).label }}
                    </div>
                  </div>
                  <div class="action-item__right">
                    <icon-edit
                      class="action-item__action-icon"
                      theme="outline"
                      size="18"
                      :stroke-width="2"
                      @click="onEditEventAction(eventTriggerName, eventTriggerData, action)"
                    />
                    <icon-delete
                      class="action-item__action-icon"
                      theme="outline"
                      size="18"
                      :stroke-width="2"
                      @click="onDeleteEventAction(eventTriggerName, eventTriggerData, action)"
                    />
                  </div>
                </div>
                <div class="action-item__tip">
                  <component :is="parseActionLabelAndTip(action).tip" />
                </div>
              </div>
            </template>
          </draggable>
        </a-collapse-item>
      </a-collapse>
      <el-empty v-else description="快去创建事件，让你的产品动起来吧" />

      <div class="add-trigger-button">
        <a-popover
          v-model:popup-visible="isPopoverShow"
          trigger="click"
          :content-class="$popoverStyle.popoverWithOutTitle"
        >
          <el-button plain>添加事件</el-button>
          <template #content>
            <div class="flex flex-col">
              <el-button
                v-for="(e, eventName) in eventTriggersSchema"
                :key="eventName"
                text
                @click="onAddEventTrigger(eventName, e)"
              >
                {{ e.title }}
              </el-button>
            </div>
          </template>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, toRefs } from 'vue'
import Draggable from 'vuedraggable'
import {
  Delete as IconDelete,
  Drag as IconDrag,
  Edit as IconEdit,
  Plus as IconPlus,
} from '@icon-park/vue-next'
import type {
  EventTrigger,
  LibraryComponentInstanceActionItem,
  LibraryComponentInstanceEventTriggers,
} from '@/types/library-component-event'
import $popoverStyle from '@/assets/style/popover.module.scss'
import {
  createCustomAttributeTabEmits,
  createCustomAttributeTabProps,
} from '@/views/home/components/home-right/components/attribute-panel/util'
import { createLibraryComponentInstanceEventAction, uuid } from '@/utils/library'
import { actionConfigDialog } from '@/views/home/components/action-config-dialog'
import { getActionHandle } from '@/views/home/components/action-config-dialog/action'
import { useCodeStore } from '@/stores/code'
import { libraryMap } from '@/library'

defineOptions({
  name: 'EventTab',
})

const props = defineProps(createCustomAttributeTabProps())
const emit = defineEmits(createCustomAttributeTabEmits())
const { componentSchema, cursorPanel } = toRefs(props)
const componentInstanceData = useVModel(props, 'componentInstanceData', emit)
const componentInstanceEventTriggers = computed({
  get: () => componentInstanceData!.value?.eventTriggers,
  set: (val) => {
    if (!componentInstanceData!.value?.eventTriggers) return undefined
    componentInstanceData.value.eventTriggers = val
  },
})
const eventTriggersSchema = computed(() => componentSchema!.value?.eventTriggers)

const isPopoverShow = ref(false)
const collapseActiveKey = ref<string[]>([])
watch(componentSchema!, () => {
  nextTick(() => {
    if (!componentInstanceEventTriggers.value) {
      collapseActiveKey.value = []
      return undefined
    }
    collapseActiveKey.value = Object.entries(componentInstanceEventTriggers.value).map(
      ([val]) => val
    )
  })
})

/**
 * 添加事件触发器
 * @param eventName
 * @param eventSchema
 */
function onAddEventTrigger(eventName: string, eventSchema: ValueOf<EventTrigger>) {
  isPopoverShow.value = false
  if (!componentInstanceEventTriggers.value)
    throw new TypeError(`componentInstanceEventTriggers 不能是 undefined`)
  componentInstanceEventTriggers.value[eventName] =
    createLibraryComponentInstanceEventAction(eventName)
  // 默认展开新添加的Trigger
  if (!collapseActiveKey.value.includes(eventName)) {
    collapseActiveKey.value.push(eventName)
  }
}

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

const codeStore = useCodeStore()
function parseActionLabelAndTip(action: LibraryComponentInstanceActionItem) {
  const actionHandle = getActionHandle(action.actionName)
  if (!actionHandle) {
    console.error(`${action.actionName} actionHandle not found`)
    throw new TypeError(`${action.actionName} actionHandle not found`)
  }
  if (!actionHandle.parseTip) {
    console.error(`actionHandle '${action.actionName}' method 'parseTip' not found`)
    throw new TypeError(`actionHandle '${action.actionName}' method 'parseTip' not found`)
  }
  let tip = actionHandle.parseTip(action.config, codeStore.jsonCode, libraryMap)
  if (tip instanceof String) {
    tip = () => <>{tip}</>
  }
  return {
    tip,
    label: actionHandle.label,
  } as { tip: () => JSX.Element; label: string }
}
</script>

<style lang="scss" scoped>
.event-tab__collapse {
  :deep(.arco-collapse-item-content) {
    @apply bg-transparent p-0;
  }
}

.icon-button {
  @apply cursor-pointer;
  color: #333;
  &:hover {
    color: var(--el-color-primary);
  }
}

.add-trigger-button {
  @apply flex justify-center;
  padding: 10px;
  .el-button {
    @apply w-full;
  }
}

.event-tab__container {
  @apply flex flex-col h-full;
  .event-tab__wrapper {
    @apply flex flex-col flex-grow justify-between;
  }
}

.action-item {
  @apply rounded flex flex-col p-3 mx-3 mt-2;
  width: calc(var(--attribute-panel-width) - 0.75rem - 0.75rem);
  background-color: #f7f7f9;
  &:first-of-type {
    @apply mt-0;
  }

  &__header {
    @apply flex justify-between items-center;
  }
  &__tip {
    @apply text-sm truncate;
    color: var(--el-text-color-secondary);
    margin-left: calc(18px + 8px);
  }
  &__left,
  &__right {
    @apply flex items-center;
  }
  &__title {
    @apply ml-2;
  }
  &__action-icon {
    @apply ml-2 cursor-pointer;
    color: #333;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  &__drag-handle {
    @apply cursor-grab;
  }
}
</style>
