<template>
  <div class="slot-item">
    <page-draggable
      class="inner-draggable"
      :class="{ slot: !slotChildren?.length }"
      :draggable-config="slotItemDraggableConfigRef"
      :data-list="slotChildren"
      :data-slot="`插槽【${slotKey}】\n 拖拽组件到此处`"
    >
      <template #item="{ element }">
        <div
          class="edit-component-item"
          @mousedown.stop="onChoose(element)"
          @touchstart.capture="onTouchEvent"
          @touchmove.capture="onTouchEvent"
          @touchend.capture="onTouchEvent"
        >
          <widget-render :widget-element="element" :container-map="containerMap">
            <template
              v-for="(value, slotNameK) in element.props?.slots"
              :key="slotNameK"
              #[slotNameK]
            >
              <slot-item
                :children="value.children"
                :slot-key="slotNameK"
                :on-touch-event="onTouchEvent"
                :on-choose="onChoose"
                :is-down-space="isDownSpace"
                :container="element"
              />
            </template>
          </widget-render>
        </div>
      </template>
    </page-draggable>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { ComputedRef } from 'vue'
import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import type { LibraryComponentInstanceData } from '@/types/library-component'
import PageDraggable from '@/components/page-draggable/index.vue'
import { DRAGGABLE_GROUP_NAME } from '@/constant'
import WidgetRender from '@/views/home/components/edit-panel/components/widget-render.vue'
import { useCodeStore } from '@/stores/code'

defineOptions({ name: 'SlotItem' })

interface SlotItemProps {
  slotKey: string
  children?: LibraryComponentInstanceData[]
  isDownSpace?: boolean
  onChoose: (data: LibraryComponentInstanceData) => void
  onTouchEvent: (e: TouchEvent) => void
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

const slotItemDraggableConfigRef: ComputedRef<Draggable> = computed(() => ({
  draggableProp: {
    group: { name: DRAGGABLE_GROUP_NAME },
    itemKey: 'indexId',
    disabled: props.isDownSpace,
    animation: 200,
  },
}))
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
