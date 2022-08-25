<template>
  <div class="slot-item">
    <div v-for="element in slotChildren" :key="element.uuid" class="edit-component-item">
      <widget-render :widget-element="element" :container-map="containerMap">
        <template v-for="(value, slotNameK) in element.props?.slots" :key="slotNameK" #[slotNameK]>
          <slot-item :children="value.children" :slot-key="slotNameK" :container="element" />
        </template>
      </widget-render>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { LibraryComponentInstanceData } from '@cow-low-code/types'
import WidgetRender from '@/components/widget-render.vue'
import { useCodeStore } from '@/stores/code'

defineOptions({ name: 'SlotItem' })

interface SlotItemProps {
  slotKey: string
  children?: LibraryComponentInstanceData[]
}
const props = withDefaults(defineProps<SlotItemProps>(), {
  children: () => [],
  isDownSpace: false,
})

const emits = defineEmits(['update:children', 'on-choose', 'on-touch-event'])
const slotChildren = useVModel(props, 'children', emits)

// 添加容器组件为一组映射
const attr = useAttrs()
//TODO: 将容器映射、递归查找函数传入LayOut容器中
const store = useCodeStore()
const { containerMap } = storeToRefs(store)
watch(
  slotChildren,
  () => {
    const container = cloneDeep<LibraryComponentInstanceData>(
      attr['container'] as LibraryComponentInstanceData
    )
    containerMap.value[container?.uuid] = container
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.inner-draggable {
  height: 100%;
  min-height: 40px;
  position: relative;
}

.inner-draggable.slot::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  height: auto;
  min-height: 40px;
  font-size: 12px;
  color: #8591a2;
  text-align: center;
  background: rgba(246, 247, 249, 0.5);
  content: attr(data-slot);
  outline: 1px dashed #dedede;
  outline-offset: -1px;
  flex-direction: column;
  justify-content: center;
}
</style>
