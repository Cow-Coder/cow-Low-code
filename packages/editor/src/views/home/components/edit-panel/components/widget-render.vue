<template>
  <div class="widget-render">
    <widget-item :comp-id="element.uuid" v-bind="widgetProps" @dispatch-event="handleDispatchEvent">
      <!-- 使用里面的插槽并且重新派发给edit使用 -->
      <template v-for="(value, slotKey) in element.props?.slots" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" />
      </template>
    </widget-item>
  </div>
</template>

<script lang="ts" setup>
import type { LibraryComponentInstanceData } from '@/types/library-component'
import type { PropType } from 'vue'
import useParseLibrary from '@/views/home/components/edit-panel/use-parse-library'

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
})
const emits = defineEmits(['update:widgetElement'])
const element = useVModel(props, 'widgetElement', emits)

const { parseLibraryComponent } = useParseLibrary(toRef(props, 'isDownSpace'))

// 拿到物料的 【组件、属性、分发事件】
const [WidgetItem, widgetProps, handleDispatchEvent] = parseLibraryComponent(element.value)

// 拿到动态插槽的名字
</script>

<style lang="scss" scoped></style>
