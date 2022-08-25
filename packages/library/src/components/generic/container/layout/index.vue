<template>
  <div class="layout" :class="widgetCssArr">
    <van-row v-model="activeNames" :gutter="gutter" :align="align" :justify="justify">
      <template v-for="item in colValue" :key="item.slotName">
        <van-col :span="item.span">
          <slot :name="item.slotName" />
        </van-col>
      </template>
    </van-row>
  </div>
</template>

<script lang="tsx">
import { computed, defineComponent, ref, watch } from 'vue'
import { ElIcon } from 'element-plus'
import {
  createLibraryComponentPropItem,
  createSlots,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types'
import { useVModel } from '@vueuse/core'
import { HorizontalTidyUp } from '@icon-park/vue-next'
import { isUndefined } from 'lodash-es'
import type { PropType } from 'vue'
import type { ContainerMap, LibraryComponentInstanceData, SlotItemValue } from '@cow-low-code/types'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetLayout',
    widgetType: 'container',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'container',
    order: 6,
    libraryPanelShowDetail: {
      title: '分栏',
      icon: () => <HorizontalTidyUp theme="outline" size="16" fill="#333" strokeWidth={3} />,
    },
    tips: {
      title: '布局容器',
      desc: '通过基础的 24 分栏，迅速简便地创建布局。',
      preview: () => (
        <el-row gutter={20} style={{ margin: 0 }}>
          <el-col span={6} style={{ backgroundColor: 'skyblue' }}>
            span: 6
          </el-col>
          <el-col span={6} style={{ backgroundColor: 'pink' }}>
            span: 6
          </el-col>
          <el-col span={6} style={{ backgroundColor: 'palevioletred' }}>
            span: 6
          </el-col>
          <el-col span={6} style={{ backgroundColor: 'green' }}>
            span: 6
          </el-col>
        </el-row>
      ),
    },
  }),
  props: {
    gutter: createLibraryComponentPropItem({
      title: '列元素之间的间距 ',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: [Number, String],
      default: '',
    }),
    slots: createLibraryComponentPropItem({
      title: '列元素比例',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.select,
      selectOptions: [
        { title: '24', value: createSlots('24') },
        { title: '12:12', value: createSlots('12:12') },
        { title: '6:18', value: createSlots('6:18') },
        { title: '18:6', value: createSlots('18:6') },
        { title: '8:8:8', value: createSlots('8:8:8') },
        { title: '6:12:6', value: createSlots('6:12:6') },
        { title: '6:6:6:6', value: createSlots('6:6:6:6') },
      ],
      default: createSlots('12:12'),
    }),
    justify: createLibraryComponentPropItem({
      title: '主轴对齐方式',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.select,
      selectOptions: [
        { title: '居中对齐', value: 'center' },
        { title: '每个元素两侧相等', value: 'space-around' },
        { title: '两端对齐', value: 'space-between' },
        { title: '右对齐', value: 'end' },
      ],
      default: 'center',
    }),
    align: createLibraryComponentPropItem({
      title: '交叉轴对齐方式',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.select,
      selectOptions: [
        { title: '顶部对齐', value: 'top' },
        { title: '垂直居中', value: 'center' },
        { title: '底部对齐', value: 'bottom' },
      ],
      default: 'center',
    }),
    widgetCss: createLibraryComponentPropItem({
      title: '控件样式',
      default: {},
      formType: AttributePanelFormItemInputTypeEnum.cssPropertyInput,
      belongToPanel: AttributePanelsEnum.appearance,
    }),
    containerMap: {
      type: Object as PropType<ContainerMap>,
      default: () => ({}),
    },
    myInstanceData: {
      type: Object as PropType<LibraryComponentInstanceData>,
    },
  },
  emits: ['update:slots', 'update:widgetCss'],
  setup(props, { attrs, emit }) {
    const activeNames = ref<string[]>(['1'])
    // watch(useVModel(props, 'defaultFold', emit), (newValue) => {
    //   activeNames.value = newValue ? ['1'] : []
    // })
    const compCss = useVModel(props, 'widgetCss', emit, { passive: true })
    //初始化css数组
    const widgetCssArr = computed(() => {
      const tempCss = []
      for (const item1 in compCss.value) {
        tempCss.push(compCss.value[item1]?.[0])
      }
      return tempCss
    })

    // 监听列比例的变化，保留上一次的物料给新的slot
    watch(
      () => props.slots.value,
      () => {
        if (isUndefined(props.myInstanceData)) return undefined
        const oldSlots = props.containerMap[props.myInstanceData.uuid]?.props
          ?.slots as SlotItemValue
        const myInstanceData = props.myInstanceData
        if (!myInstanceData) return
        const containerSchemaSlots = myInstanceData.props?.slots as SlotItemValue
        if (Object.keys(containerSchemaSlots).length) {
          Object.entries<SlotItemValue>(containerSchemaSlots).forEach(([key, slot]) => {
            if (oldSlots[key]?.children) {
              slot.children = oldSlots[key].children
            }
          })
        }
      }
    )

    // 列属性【插槽名、栅格列数】
    const colValue = computed(() =>
      Object.values(Object.keys(props.slots).length ? props.slots : createSlots('12:12'))
        ?.filter((item) => typeof item !== 'string')
        .map((mItem) => {
          const spanItem = mItem as SlotItemValue
          return {
            slotName: spanItem?.key,
            span: spanItem?.span,
          }
        })
    )
    return { colValue, activeNames, widgetCssArr }
  },
})
</script>

<style lang="scss" scoped></style>
