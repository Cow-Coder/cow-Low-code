<template>
  <el-tabs class="attribute-tab-pane" type="border-card">
    <el-tab-pane v-for="panelItem in panelList" :key="panelItem.name" :label="panelItem.title">
      <keep-alive>
        <component
          :is="panelItem.component"
          v-if="panelItem.component"
          v-model:component-instance-data="componentData"
          :component-schema="componentSchema"
          :cursor-panel="panelItem.name"
        />
        <component
          :is="formRender(componentDataProps, panelItem.name, componentSchemaProps)"
          v-else
        />
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx" setup>
/*
这里有两种遍历方式
1. 纯粹遍历 panelList
   问题在于组件属性schema和data全部都要从起点开始拿
   比如
   componentSchema.props.panelItem['name'][第几个表单项].type
   componentData.props.panelItem['name'].xxx属性
2. 把组件属性schema和data糅合进 panelList 里面，然后一起遍历
   问题在于当被选中物料组件变化时候又需要重新糅合一遍
 */
import { ref } from 'vue'
import type { WritableComputedRef } from 'vue'
import type {
  LibraryComponent,
  LibraryComponentInstanceData,
  LibraryComponentInstanceProps,
  LibraryComponentProps,
} from '@/types/library-component'
import { panelList } from '@/views/home/components/home-right/components/attribute-panel/config'
import { useCodeStore } from '@/stores/code'
import formRender from '@/views/home/components/home-right/components/attribute-panel/components/form-render'

defineOptions({
  name: 'AttributePanel',
})

const codeStore = useCodeStore()
const { focusData } = storeToRefs(codeStore)

const componentData = ref<LibraryComponentInstanceData>()
const componentSchema = shallowRef<LibraryComponent>()
watch(focusData, () => {
  if (!focusData.value) {
    componentSchema.value = undefined
    componentData.value = undefined
    return false
  }
  const focus = focusData.value
  /**
   * 开启vue devtool会出现 选中组件不跟手的问题，大概300ms延迟
   */
  setTimeout(() => {
    const [focusedLibraryComponentInstanceData, focusedLibraryComponentSchema] =
      codeStore.getLibraryComponentInstanceDataAndSchema(focus)

    componentData.value = focusedLibraryComponentInstanceData
    componentSchema.value = focusedLibraryComponentSchema
  }, 0)
})

const componentDataProps: WritableComputedRef<LibraryComponentInstanceProps | undefined> = computed(
  {
    get() {
      if (!componentData.value) return undefined
      return componentData.value?.props
    },
    set(val) {
      if (!componentData.value) return undefined
      componentData.value.props = val
    },
  }
)
const componentSchemaProps: WritableComputedRef<LibraryComponentProps | undefined> = computed({
  get() {
    if (!componentSchema.value) return undefined
    return componentSchema.value?.props
  },
  set(val) {
    if (!componentSchema.value) return undefined
    componentSchema.value.props = val
  },
})
</script>

<style lang="scss" scoped>
.attribute-tab-pane {
  @apply flex;
  :deep(.el-tabs__content) {
    @apply p-0 flex flex-grow;
    .el-tab-pane {
      @apply flex-grow w-full;
    }

    .el-form-item__content {
      @apply justify-end;
    }
  }
}
</style>

<style lang="scss" module>
.attitudePanelInner {
  padding: 15px;
}
</style>
