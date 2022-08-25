<template>
  <div class="outline-panel" style="padding: 15px">
    <div class="outline-filter">
      <el-input v-model="filterText" placeholder="搜索" />
    </div>
    <div class="outline-tree">
      <ElTree
        ref="treeRef"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :data="outlineData"
        highlight-current
        :draggable="true"
        default-expand-all
        node-key="uuid"
        :filter-node-method="filterNode"
        empty-text="暂无内容"
        @node-drop="handleDrop"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import type { NodeDropType } from 'element-plus/es/components/tree/src/tree.type'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { TreeData } from '@/utils/map-schemes-2-outline'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'OutlinePanel',
})

// 获取大纲数据
const store = useCodeStore()
const { outlineData } = storeToRefs(store)

// 是否允许放入【只允许放入Layout容器组件里面，其余的只能放前后】
const allowDrop = (draggingNode: Node, dropNode: Node, type: NodeDropType) => {
  const treeData = dropNode.data as TreeData
  return treeData.compType !== 'container' ? type !== 'inner' : true
}
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

watch(filterText, (val) => {
  treeRef.value?.filter(val)
})

// 过滤器
const filterNode = (value: string, data: TreeData) => {
  if (!value) return true
  return data.label.includes(value)
}

// 拖拽成功放入时，将其组件顺序修改
const handleDrop = (draggingNode: Node, dropNode: Node, dropType: NodeDropType) => {
  // 拖拽后给选中项赋值
  setTimeout(() => {
    treeRef.value?.setCurrentKey(draggingNode.data.uuid)
  }, 0)
  handleCurrentChange(draggingNode.data as TreeData)
  store.updateJsonCodeAtDragged(draggingNode.data.uuid, dropNode.data.uuid, dropType)
}

// 选中时，给聚焦组件的属性栏赋值
const handleCurrentChange = (data: TreeData) => {
  store.dispatchFocus(data.uuid!)
}

// 只允许外层节点拖动
const allowDrag = (draggingNode: Node) => {
  const parent = treeRef.value?.getNode(draggingNode.data.uuid)?.parent.data
  return Array.isArray(parent)
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
