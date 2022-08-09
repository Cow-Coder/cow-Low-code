<template>
  <el-dialog
    v-model="actionDialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    draggable
    title="动作配置"
    destroy-on-close
    :custom-class="$style.actionConfigDialog"
    width="800px"
    :fullscreen="fullscreen"
  >
    <div class="layout">
      <div class="actions">
        <el-tree
          :data="actionList"
          node-key="name"
          :highlight-current="true"
          :default-expand-all="true"
          :expand-on-click-node="false"
          @current-change="onCurrentChange"
        />
      </div>
      <div v-if="!chooseAction?.children" class="config">
        <div class="config-item">
          <div class="config-title">动作说明</div>
          <div class="config-description config-main">{{ chooseAction?.description }}</div>
        </div>
        <div class="config-item">
          <div class="config-title">基础设置</div>
          <div class="config-main">
            <component :is="chooseAction?.configPanel" />
          </div>
        </div>
      </div>
      <el-empty v-else class="config" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button plain @click="actionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="actionDialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { commonActions } from './config'
import type { ActionHandlerSchema } from '@/types/library-component-event'
import type { ComputedRef } from 'vue'
defineOptions({
  name: 'ActionConfigDialog',
})

const actionDialogVisible = ref(true)
const actionList: ComputedRef<ActionHandlerSchema[]> = computed(() => {
  return commonActions
})

const fullscreen = ref(false)

const chooseAction = ref<ActionHandlerSchema>()
function onCurrentChange(data: ActionHandlerSchema) {
  chooseAction.value = data
}

const close = () => (actionDialogVisible.value = false)
const open = () => (actionDialogVisible.value = true)
defineExpose({
  close,
  open,
})
</script>

<style lang="scss" scoped>
.layout {
  @apply flex border border-solid border-gray-200;
  height: 400px;
  color: var(--el-text-color-primary);
  .actions {
    flex: 0 0 25%;
    padding: 10px 0;
  }
  .config {
    @apply flex-grow border-l border-solid border-gray-200;
    padding: 10px;
    .config-description {
      color: var(--el-text-color-secondary);
    }
    .config-item {
      .config-main {
        @apply indent-8;
        margin: 15px 0;
      }
    }
  }
}
</style>

<style lang="scss" module>
.actionConfigDialog {
  :global {
    .el-dialog__body {
      padding: var(--el-dialog-padding-primary);
    }
  }
}
</style>
