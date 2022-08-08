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
          v-for="(eventObj, eventName) in componentInstanceEventTriggers"
          :key="eventName"
          :header="eventTriggersSchema[eventName].title"
        >
          <template #extra>
            <div class="flex">
              <a-space>
                <plus
                  class="icon-button"
                  theme="outline"
                  size="16"
                  @click.capture.stop="onAddEvent(eventName, eventObj)"
                />
                <delete
                  class="icon-button"
                  theme="outline"
                  size="16"
                  @click.capture.stop="onDeleteEventTrigger(eventName, eventObj)"
                />
              </a-space>
            </div>
          </template>
          <div>{{ eventObj }}</div>
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

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { Delete, Plus } from '@icon-park/vue-next'
import type { EventTrigger } from '@/library/types'
import type { LibraryComponentInstanceEventTriggers } from '@/views/edit-panel/types'
import $popoverStyle from '@/assets/style/popover.module.scss'
import {
  createCustomAttributeTabEmits,
  createCustomAttributeTabProps,
} from '@/views/attribute-panel/helper'
import { createLibraryComponentInstanceEventAction } from '@/utils/library'

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
function onAddEvent(eventName: string, eventObj: ValueOf<LibraryComponentInstanceEventTriggers>) {
  // console.log(111)
}
function onDeleteEventTrigger(
  eventName: string,
  eventObj: ValueOf<LibraryComponentInstanceEventTriggers>
) {
  delete componentInstanceEventTriggers.value![eventName]
}
</script>

<style lang="scss" scoped>
.event-tab__collapse {
  :deep(.arco-collapse-item-content) {
    @apply bg-transparent;
  }
}

.icon-button {
  @apply cursor-pointer;
  color: #333;
  &:hover {
    color: $color-primary;
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
</style>
