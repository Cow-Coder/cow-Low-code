<template>
  <van-circle
    v-model:current-rate="currentRate"
    :rate="rate"
    :text="text"
    :color="color"
    :layer-color="layerColor"
    :fill="fill"
    :speed="speed"
    :stroke-width="strokeWidth"
    :clockwise="clockwise"
  />
</template>

<script lang="tsx">
import { computed, ref } from 'vue'
import { ElIcon } from 'element-plus'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'
export default {
  ...defineLibraryComponent({
    name: 'WidgetCircle',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'show',
    order: 8,
    libraryPanelShowDetail: {
      title: '圆形进度条',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-PieChart />
          </ElIcon>
        </>
      ),
    },
    tips: {
      title: '圆形进度条',
      desc: '圆环形的进度条组件，支持进度渐变动画。',
      preview: () => (
        <>
          <van-circle rate="30" speed="100" Stext="text" />
        </>
      ),
    },
    eventTriggers: {
      click: {
        title: '点击',
      },
      enter: {
        title: '鼠标移入',
      },
      leave: {
        title: '鼠标移出',
      },
    },
  }),
  props: {
    rate: createLibraryComponentPropItem({
      title: '目标进度',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.stepper,
      type: [Number, String],
      default: '100',
    }),
    color: createLibraryComponentPropItem({
      title: '颜色',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.colorPicker,
      type: String,
      default: '#3fecff',
    }),
    layerColor: createLibraryComponentPropItem({
      title: '轨道颜色',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.colorPicker,
      type: String,
      default: '#eeece1',
    }),
    fill: createLibraryComponentPropItem({
      title: '填充颜色',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.colorPicker,
      type: String,
      default: '#fcfcfd',
    }),
    speed: createLibraryComponentPropItem({
      title: '动画速度',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      type: [Number, String],
      default: 30,
    }),
    strokeWidth: createLibraryComponentPropItem({
      title: '进度条宽度',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.input,
      default: 66,
    }),
    clockwise: createLibraryComponentPropItem({
      title: '是否顺时针增加',
      belongToPanel: AttributePanelsEnum.generic,
      formType: AttributePanelFormItemInputTypeEnum.switch,
      type: Boolean,
      default: true,
    }),
  },
  setup() {
    const currentRate = ref(0)
    const text = computed(() => `${currentRate.value.toFixed(0)}%`)
    return {
      currentRate,
      text,
    }
  },
}
</script>

<style scoped></style>
