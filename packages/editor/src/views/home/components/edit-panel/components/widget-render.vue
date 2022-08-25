<template>
  <div class="widget-render">
    <widget-item
      v-if="true"
      v-bind="widgetProps"
      :ref="bindComponentRef"
      :my-instance-data="element"
      :container-map="containerMap"
      @dispatch-event="handleDispatchEvent"
    >
      <!-- 使用里面的插槽并且重新派发给edit使用 -->
      <template v-for="(value, slotKey) in element.props?.slots" :key="slotKey" #[slotKey]>
        <slot :name="slotKey" />
      </template>
    </widget-item>
    <component :is="renderFn" v-if="false" />
  </div>
</template>

<script lang="tsx" setup>
import type { ContainerMap, LibraryComponentInstanceData } from '@/types/library-component'
import type { ComputedRef, PropType, Ref } from 'vue'
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
  containerMap: {
    type: Object as PropType<ContainerMap>,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:widgetElement'])
const element = useVModel(props, 'widgetElement', emits) as Ref<LibraryComponentInstanceData>

const { parseLibraryComponent } = useParseLibrary(toRef(props, 'isDownSpace'))

// 拿到物料的 【组件、属性、分发事件】
const { WidgetItem, widgetProps, handleDispatchEvent, bindComponentRef } = parseLibraryComponent(
  element.value
)

// 只有从函数返回的动态组件才响应整个根节点的替换
function renderFn() {
  const widgetComponent = WidgetItem as unknown as JSX.Element
  function dynamicSlotFn() {
    const result = element.value.props?.slots
      ? Object.entries(element.value.props?.slots as any).reduce((prev, cursor, index) => {
          // console.log(`element.value.props`, prev, cursor)
          prev[cursor[0]] = () => <slot key={cursor[0]} v-slot={cursor[0]} />
          return prev
        }, {} as Record<string, any>)
      : undefined
    // console.log(`result`, result, element.value.props?.slots)
    return result
  }
  return (
    <widgetComponent
      {...widgetProps}
      ref={bindComponentRef}
      compId={element.value.uuid}
      myInstanceData={element.value}
      containerMap={props.containerMap}
      onDispatchEvent={handleDispatchEvent}
    >
      {dynamicSlotFn()}
    </widgetComponent>
  )
}

// 拿到动态插槽的名字
</script>

<style lang="scss" scoped></style>
