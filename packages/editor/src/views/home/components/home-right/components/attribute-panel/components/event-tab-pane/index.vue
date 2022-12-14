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
        <!--        一个事件触发器item-->
        <a-collapse-item
          v-for="(eventTriggerData, eventTriggerName) in componentInstanceEventTriggers"
          :key="eventTriggerName"
        >
          <!--          事件触发器title-->
          <template #header>
            <a-space>
              {{ parseCollapseHeaderLabel(eventTriggerName, eventTriggerData) }}
              <el-tooltip
                v-if="
                  isCustomEventTriggerName(eventTriggerName) && eventTriggerData.description !== ''
                "
                :content="eventTriggerData.description"
              >
                <icon-info theme="outline" size="14" fill="#333" :stroke-width="4" />
              </el-tooltip>
            </a-space>
          </template>
          <!--          事件触发器右侧图标-->
          <template #extra>
            <div class="flex">
              <a-space>
                <icon-edit
                  v-if="isCustomEventTriggerName(eventTriggerName)"
                  class="icon-button"
                  theme="outline"
                  size="16"
                  @click.capture.stop="editCustomEventTrigger(eventTriggerName, eventTriggerData)"
                />
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
          <!--          事件动作列表-->
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

      <!--      底部添加事件按钮-->
      <div class="add-trigger-button">
        <div v-show="eventTriggersSchema" class="flex flex-col flex-grow">
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

        <div v-show="!eventTriggersSchema" class="flex flex-col flex-grow">
          <el-tooltip content="该组件暂无任何事件触发器" placement="top">
            <div class="flex flex-col flex-grow">
              <el-button plain disabled>添加事件</el-button>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>

  <!--  自定义事件添加dialog-->
  <div v-element-dialog-resize="{ draggable: true, fullscreen: true }" class="el-dialog">
    <el-dialog
      ref="dialogCustomEventTriggerRef"
      v-model="dialogIsShowCustomEventTrigger"
      append-to-body
      :custom-class="$style.dialogCustomEventTrigger"
      :lock-scroll="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template #header>
        <div class="flex items-center">
          <span role="heading" class="el-dialog__title">自定义事件触发器-代码编辑</span>
          <el-tooltip>
            <template #content>
              <div style="font-size: 14px">
                <p>可能需要您在了解本程序源码之后，才能自如地编写自定义事件触发器</p>
                <p>
                  这里您可以先看一个示例
                  <el-link
                    :underline="false"
                    type="warning"
                    style="vertical-align: baseline"
                    @click="onLoadDemoCustomEventTrigger"
                  >
                    按钮三击、四击事件
                  </el-link>
                </p>
              </div>
            </template>
            <icon-info theme="outline" size="16" fill="#333" :stroke-width="4" class="ml-3" />
          </el-tooltip>
        </div>
      </template>
      <el-form :model="customEventTriggerData">
        <el-form-item label="事件名称">
          <el-input v-model="customEventTriggerData.title" placeholder="自定义事件" />
        </el-form-item>
        <el-form-item label="事件描述">
          <el-input v-model="customEventTriggerData.description" />
        </el-form-item>
      </el-form>
      <monaco-editor
        v-model="customEventTriggerData.execCode"
        custom-class=""
        :class="['w-full', 'flex-grow']"
        style="height: calc(100% - 100px)"
      />
      <template #footer>
        <el-button class="mr-2.5" @click="dialogIsShowCustomEventTrigger = false">取消</el-button>
        <el-button type="primary" @click="onSubmitCustomEventTrigger">确认</el-button>
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
  Info as IconInfo,
  Plus as IconPlus,
} from '@icon-park/vue-next'
import { ElDialog } from 'element-plus'
import useEventAction from './use-event-action'
import useEventTabPane from './use-event-tab-pane'
import useEventTrigger from './use-event-trigger'
import { isCustomEventTriggerName } from '@/utils/library'
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
  componentSchema,
  eventTriggersSchema,
  componentInstanceData,
  componentInstanceEventTriggers,
  collapseActiveKey,
  parseCollapseHeaderLabel,
  parseActionLabelAndTip,
} = useEventTabPane()
const { onAddEventAction, onDeleteEventAction, onEditEventAction } = useEventAction()
const {
  customEventTriggerData,
  dialogIsShowCustomEventTrigger,
  dialogCustomEventTriggerRef,
  isPopoverShow,
  onAddEventTrigger,
  onDeleteEventTrigger,
  editCustomEventTrigger,
  onSubmitCustomEventTrigger,
  onLoadDemoCustomEventTrigger,
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
  //width: calc(var(--attribute-panel-width) - 0.75rem - 0.75rem);
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
