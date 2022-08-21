<template>
  <el-form :class="$style.attitudePanelInner" :model="componentDataProps">
    <el-form-item
      v-if="componentInstanceData"
      label="物料组件唯一标识符(uuid)"
      style="display: block"
    >
      <el-input v-model="componentInstanceData.uuid" disabled />
    </el-form-item>
    <component
      :is="formRender(componentDataProps, props.cursorPanel, componentSchemaProps, false)"
    />
  </el-form>
</template>

<script lang="ts" setup>
import { createCustomAttributeTabEmits, createCustomAttributeTabProps } from '../util'
import formRender from './form-render'
import type {
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
  LibraryComponentProps,
} from '@cow-low-code/types'
import type { Ref, WritableComputedRef } from 'vue'

defineOptions({
  name: 'GenericTabPane',
})

const props = defineProps(createCustomAttributeTabProps())
const emit = defineEmits(createCustomAttributeTabEmits())
const componentInstanceData = useVModel(props, 'componentInstanceData', emit, {
  passive: true,
}) as Ref<LibraryComponentInstanceData>

const componentDataProps: WritableComputedRef<LibraryComponentInstanceProps | undefined> = computed(
  {
    get() {
      if (!componentInstanceData.value) return undefined
      return componentInstanceData.value?.props
    },
    set(val) {
      if (!componentInstanceData.value) return undefined
      componentInstanceData.value.props = val
    },
  }
)
const componentSchemaProps: WritableComputedRef<LibraryComponentProps | undefined> = computed(
  () => {
    if (!props.componentSchema) return undefined
    return props.componentSchema?.props
  }
)
</script>

<style lang="scss" module>
.attitudePanelInner {
  padding: 15px;
}
</style>
