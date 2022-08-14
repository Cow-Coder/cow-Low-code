<template>
  <div class="outline-panel">
    <el-tree
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :data="outline"
      draggable
      default-expand-all
      node-key="id"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    />
  </div>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import { mapSchemes2Outline } from '@/utils/map-schemes-2-outline'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'OutlinePanel',
})

const store = useCodeStore()
const { outlineData } = storeToRefs(store)
const outline = computed(() => mapSchemes2Outline(outlineData.value))

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node)
}
const handleDragEnter = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag enter:', dropNode.label)
}
const handleDragLeave = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag leave:', dropNode.label)
}
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log('tree drag over:', dropNode.label)
}
const handleDragEnd = (draggingNode: Node, dropNode: Node, dropType: DropType, ev: DragEvents) => {
  console.log('tree drag end:', dropNode && dropNode.label, dropType)
}
const handleDrop = (draggingNode: Node, dropNode: Node, dropType: DropType, ev: DragEvents) => {
  console.log('tree drop:', dropNode.label, dropType)
}
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('Level three 3-1-1')
}
</script>

<style lang="scss" scoped></style>
