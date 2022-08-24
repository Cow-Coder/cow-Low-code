<template>
  <div :class="widgetCssArr">
    <p>{{ title }}</p>
    <van-checkbox-group
      ref="checkboxGroupRef"
      v-model="checkList"
      :direction="direction"
      class="test"
    >
      <van-checkbox v-show="choseAll" :shape="shape" @click="checkAll">全选/全不选</van-checkbox>
      <van-checkbox
        v-for="item of defaultData"
        :key="item.value"
        :shape="shape"
        :name="item.checked ? item : ''"
        >{{ item.name }}</van-checkbox
      >
    </van-checkbox-group>
  </div>
</template>

<script lang="tsx">
import { computed, defineComponent, ref } from 'vue'
import { Checkbox, CheckboxGroup } from 'vant'
import { ElIcon } from 'element-plus'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@cow-low-code/types/src/panel'
import {
  createLibraryComponentPropItem,
  defineLibraryComponent,
} from '@cow-low-code/library/src/utils/library'
import { LibraryComponentFormItemLabelPositionEnum } from '@cow-low-code/types'
import { useVModel } from '@vueuse/core'
import { CheckCorrect } from '@icon-park/vue-next'
import type { CheckboxGroupInstance } from 'vant'

export default defineComponent({
  ...defineLibraryComponent({
    name: 'WidgetCheckboxes',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'form',
    order: 9,
    libraryPanelShowDetail: {
      title: '复选框',
      icon: () => <CheckCorrect theme="outline" size="16" strokeWidth={3} />,
    },
    tips: {
      title: '复选框',
      desc: '通过options配置多个勾选框',
      preview: () => (
        <CheckboxGroup direction={'horizontal'}>
          <Checkbox shape={'square'}>复选框1</Checkbox>
          <Checkbox>复选框2</Checkbox>
        </CheckboxGroup>
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
    field: createLibraryComponentPropItem({
      title: '字段值',
      default: 'checkboxes',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    title: createLibraryComponentPropItem({
      title: '标题',
      default: '复选框',
      formType: AttributePanelFormItemInputTypeEnum.input,
      belongToPanel: AttributePanelsEnum.generic,
    }),

    choseAll: createLibraryComponentPropItem({
      title: '可全选',
      default: false,
      formType: AttributePanelFormItemInputTypeEnum.switch,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    direction: createLibraryComponentPropItem({
      title: '排列方式',
      default: 'vertical',
      selectOptions: [
        { title: '垂直', value: 'vertical' },
        { title: '水平', value: 'horizontal' },
      ],
      formType: AttributePanelFormItemInputTypeEnum.select,
      belongToPanel: AttributePanelsEnum.appearance,
    }),
    shape: createLibraryComponentPropItem({
      title: '按钮形状',
      default: 'square',
      formType: AttributePanelFormItemInputTypeEnum.select,
      selectOptions: [
        { title: '方形', value: 'square' },
        { title: '圆形', value: 'round' },
      ],
      belongToPanel: AttributePanelsEnum.appearance,
    }),
    defaultData: createLibraryComponentPropItem({
      title: '默认选项',
      formType: AttributePanelFormItemInputTypeEnum.indefiniteNumberCheckBoxes,
      belongToPanel: AttributePanelsEnum.generic,
      default: [
        { name: '水果', value: 'fruit', checked: false, isEdit: false },
        { name: '汽车', value: 'car', checked: true, isEdit: false },
      ],
      labelPosition: LibraryComponentFormItemLabelPositionEnum.top,
      type: Array,
    }),
    widgetCss: createLibraryComponentPropItem({
      title: '控件样式',
      default: {},
      formType: AttributePanelFormItemInputTypeEnum.cssPropertyInput,
      belongToPanel: AttributePanelsEnum.appearance,
    }),
  },
  emits: ['update:defaultData', 'update:widgetCss'],
  setup(props, { emit }) {
    //通过实例获取refs
    const checkboxGroupRef = ref<CheckboxGroupInstance>()
    const checkList = useVModel(props, 'defaultData', emit, { passive: true })
    const compCss = useVModel(props, 'widgetCss', emit, { passive: true })
    //初始化css数组
    const widgetCssArr = computed(() => {
      const tempCss = []
      for (const item1 in compCss.value) {
        tempCss.push(compCss.value[item1]?.[0])
      }
      return tempCss
    })
    const checkAll = () => {
      checkboxGroupRef.value?.toggleAll(true)
    }

    return {
      checkAll,
      checkList,
      widgetCssArr,
      checkboxGroupRef,
    }
  },
})
</script>

<style lang="scss" scoped>
.test {
  pointer-events: none;
}
</style>
