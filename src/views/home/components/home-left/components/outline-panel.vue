<template>
  <div class="outline-panel">
    <div class="outline-filter">
      <el-input v-model="filterText" placeholder="Filter keyword" />
    </div>
    <div class="outline-tree">
      <el-tree
        ref="treeRef"
        :allow-drop="allowDrop"
        :data="outline"
        highlight-current
        draggable
        default-expand-all
        node-key="id"
        :filter-node-method="filterNode"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import type { TreeData } from '@/utils/map-schemes-2-outline'
import { useCodeStore } from '@/stores/code'
import { mapSchemes2Outline } from '@/utils/map-schemes-2-outline'

defineOptions({
  name: 'OutlinePanel',
})

// 获取大纲数据
const store = useCodeStore()
const { outlineData } = storeToRefs(store)
const outline = computed(() => mapSchemes2Outline(outlineData.value))

//TODO: 嵌套大纲
// 是否允许放入
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => type !== 'inner'
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: TreeData) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style lang="scss" scoped>
.outline-panel {
  .outline-filter {
    margin: 10px 0 20px;
  }
  .outline-tree {
    margin-left: 20px;
  }
}
</style>
