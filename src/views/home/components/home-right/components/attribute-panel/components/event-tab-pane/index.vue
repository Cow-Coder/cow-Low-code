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
            :animation="200"
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
  <div v-element-dialog-resize="{ draggable: true }" class="el-dialog">
    <el-dialog
      ref="dialogCustomEventTriggerRef"
      v-model="dialogIsShowCustomEventTrigger"
      append-to-body
      :custom-class="$style.dialogCustomEventTrigger"
      title="自定义事件触发器-代码编辑"
    >
      <monaco-editor />
      <template #footer>
        <div class="dialog-footer">
          <el-button class="mr-2.5" @click="dialogIsShowCustomEventTrigger = false">取消</el-button>
          <el-button type="primary" @click="onSubmitCustomEventTriggerCode">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="tsx" setup>
import Draggable from 'vuedraggable'
import {
  Delete as IconDelete,
  Drag as IconDrag,
  Edit as IconEdit,
  Plus as IconPlus,
} from '@icon-park/vue-next'
import { ElDialog } from 'element-plus'
import useEventAction from './use-event-action'
import useEventTabPane from './use-event-tab-pane'
import useEventTrigger from './use-event-trigger'
import MonacoEditor from '@/components/monaco-editor/index.vue'
import $popoverStyle from '@/assets/style/popover.module.scss'
import {
  createCustomAttributeTabEmits,
  createCustomAttributeTabProps,
} from '@/views/home/components/home-right/components/attribute-panel/util'

defineOptions({
  name: 'EventTab',
})

const props = defineProps(createCustomAttributeTabProps())
const emit = defineEmits(createCustomAttributeTabEmits())
const {
  eventTriggersSchema,
  componentInstanceData,
  componentInstanceEventTriggers,
  collapseActiveKey,
  componentSchema,
  parseActionLabelAndTip,
} = useEventTabPane()
const { onAddEventAction, onDeleteEventAction, onEditEventAction } = useEventAction()
const {
  dialogIsShowCustomEventTrigger,
  dialogCustomEventTriggerRef,
  isPopoverShow,
  onAddEventTrigger,
  onDeleteEventTrigger,
  onSubmitCustomEventTriggerCode,
} = useEventTrigger(componentInstanceEventTriggers)
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

  &.sortable-ghost {
    @apply bg-blue-300;
  }

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
<style lang="scss" module>
// dialog-custom-event-trigger
.dialogCustomEventTrigger {
  height: 70vh;
  :global {
    .el-dialog__body {
      @apply p-0;
      margin: var(--el-dialog-padding-primary);
    }
  }
}
</style>
