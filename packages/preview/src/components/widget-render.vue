<template>
  <div class="widget-render">
    <widget-item
      v-bind="widgetProps"
      :ref="bindComponentRef"
      :comp-id="element.uuid"
      :my-instance-data="element"
      :container-map="containerMap"
      @dispatch-event="handleDispatchEvent"
    >
      <!-- 使用里面的插槽并且重新派发给edit使用 -->
      <template v-for="(value, slotKey) in element.props?.slots" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" />
      </template>
    </widget-item>
  </div>
</template>

<script lang="tsx" setup>
import type { ContainerMap, LibraryComponentInstanceData } from '@cow-low-code/types'
import type { ComputedRef, PropType, Ref } from 'vue'
import useParseLibrary from '@/hooks/use-library-component'

defineOptions({ name: 'WidgetRender' })

const props = defineProps({
  widgetElement: {
    type: Object as PropType<LibraryComponentInstanceData>,
    required: true,
  },
  isDownSpace: {
    type: Boolean,
    default: false,
  },
  containerMap: {
    type: Object as PropType<ContainerMap>,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:widgetElement'])
const element = useVModel(props, 'widgetElement', emits) as Ref<LibraryComponentInstanceData>

const { parseLibraryComponent } = useParseLibrary()

// 拿到物料的 【组件、属性、分发事件】
const { WidgetItem, widgetProps, handleDispatchEvent, bindComponentRef } = parseLibraryComponent(
  element.value
)

// 拿到动态插槽的名字
</script>

<style lang="scss" scoped></style>
