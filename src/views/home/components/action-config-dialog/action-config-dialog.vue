<template>
  <el-dialog
    v-model="actionDialogVisible"
    :close-on-click-modal="false"
    :custom-class="$style.actionConfigDialog"
    :fullscreen="fullscreen"
    draggable
    title="动作配置"
    width="800px"
  >
    <div class="layout">
      <div class="actions">
        <el-tree
          ref="treeRef"
          :data="actionList"
          :default-expand-all="true"
          :expand-on-click-node="false"
          :highlight-current="true"
          node-key="name"
          @current-change="onCurrentChange"
        />
      </div>
      <div v-if="chooseAction && !chooseAction?.children" class="config">
        <div class="config-item">
          <div class="config-title">动作说明</div>
          <div class="config-description config-main">{{ chooseAction.description }}</div>
        </div>
        <div class="config-item">
          <div class="config-title">基础设置</div>
          <div class="config-main">
            <component
              :is="chooseAction.configPanel"
              ref="configPanelRef"
              v-bind="configPanelProps"
            />
          </div>
        </div>
      </div>
      <el-empty v-else class="config" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button plain @click="cancelAction">取消</el-button>
        <el-button type="primary" @click="submitAction">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { ElTree } from 'element-plus'
import { commonActions } from './action'
import type { ComponentPublicInstance, ComputedRef } from 'vue'
import type {
  ActionConfigResult,
  ActionHandlerSchema,
} from '@/views/home/components/action-config-dialog/types'
import type { getActionHandleDefaultProps } from '@/views/home/components/action-config-dialog/util'
import { useCodeStore } from '@/stores/code'
import { libraryMap } from '@/library'

defineOptions({
  name: 'ActionConfigDialog',
})

const props = defineProps({
  actionName: {
    type: [String],
  },
  actionConfig: {
    type: [String, Object],
  },
})
const emit = defineEmits(['close'])
const treeRef = ref<InstanceType<typeof ElTree>>()
onMounted(() => {
  nextTick(() => {
    if (!props.actionName) return undefined
    treeRef.value!.setCurrentKey(props.actionName)
    onCurrentChange(treeRef.value!.getCurrentNode() as ActionHandlerSchema)
  })
})

const actionDialogVisible = ref(true)
const actionList: ComputedRef<ActionHandlerSchema[]> = computed(() => {
  return commonActions
})

const configPanelRef = shallowRef<
  ComponentPublicInstance<{
    exportConfig: () => (Record<string, any> | boolean) | Promise<Record<string, any> | boolean>
  }>
>()

const fullscreen = ref(false)
const codeStore = useCodeStore()

const chooseAction = shallowRef<ActionHandlerSchema>()
const configPanelProps = {
  focusedLibraryComponentInstanceData: toRaw(
    codeStore.getLibraryComponentInstanceDataAndSchema()[0]
  ),
  libraryComponentInstanceTree: toRaw(codeStore.jsonCode),
  libraryComponentSchemaMap: libraryMap,
} as Record<keyof ReturnType<typeof getActionHandleDefaultProps>, any>
if (props.actionConfig) configPanelProps.actionConfig = toRaw(props.actionConfig)
function onCurrentChange(data: ActionHandlerSchema) {
  chooseAction.value = data
}

const configResult = shallowRef<Record<string, any> | undefined>()

async function submitAction() {
  if (!(chooseAction.value && !chooseAction.value?.children)) return undefined
  if (configPanelRef.value?.exportConfig) {
    let configObject = configPanelRef.value.exportConfig()
    if (configObject instanceof Promise) {
      configObject = await configObject
    }
    /**
     * 如果action基础设置那边的返回值是false，说明表单校验失败了或者还有其他操作。此时还不能关闭dialog
     */
    if (configObject === false) return undefined
    if (!(configObject instanceof Object))
      throw new TypeError('configPanel返回的设置必须要是一个Object')
    configResult.value = configObject
  }
  emit('close', {
    actionName: chooseAction.value!.name,
    config: cloneDeep(toRaw(configResult.value)),
  } as ActionConfigResult)
  actionDialogVisible.value = false
}

function cancelAction() {
  emit('close', false)
  actionDialogVisible.value = false
}
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
        margin: 15px 15px 15px 2rem;
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
