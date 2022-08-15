<template>
  <div class="outline-panel">
    <el-tree
      :allow-drop="allowDrop"
      :data="outline"
      highlight-current
      draggable
      default-expand-all
      node-key="id"
      @node-drag-start="handleDragStart"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import { useCodeStore } from '@/stores/code'
import { mapSchemes2Outline } from '@/utils/map-schemes-2-outline'

defineOptions({
  name: 'OutlinePanel',
})

// 获取大纲数据
const store = useCodeStore()
const { outlineData } = storeToRefs(store)
const outline = computed(() => mapSchemes2Outline(outlineData.value))

//TODO: 允许嵌套
// 是否允许放入
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => type !== 'inner'

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node)
}
const handleDragEnd = (draggingNode: Node, dropNode: Node, dropType: DropType, ev: DragEvents) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType)
}
const handleDrop = (draggingNode: Node, dropNode: Node, dropType: DropType, ev: DragEvents) => {
  console.log('tree drop:', dropNode.label, dropType)
}
</script>

<style lang="scss" scoped></style>
