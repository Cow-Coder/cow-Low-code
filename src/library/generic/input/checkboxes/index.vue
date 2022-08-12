<template>
  <div>
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
        :key="item"
        :shape="shape"
        :name="item.checked ? item : ''"
        >{{ item.name }}</van-checkbox
      >
    </van-checkbox-group>
  </div>
</template>

<script lang="tsx">
import { Checkbox, CheckboxGroup } from 'vant'
import { ElIcon } from 'element-plus'
import type { CheckboxGroupInstance } from 'vant'
import {
  AttributePanelFormItemInputTypeEnum,
  AttributePanelsEnum,
  LibraryPanelTabEnum,
} from '@/types/panel'
import { createLibraryComponentPropItem, defineLibraryComponent } from '@/utils/library'
import { LibraryComponentFormItemLabelPositionEnum } from '@/types/library-component'
export default {
  ...defineLibraryComponent({
    name: 'WidgetCheckboxes',
    libraryName: LibraryPanelTabEnum.generics,
    tabName: 'form',
    order: 5,
    showOrigin: false,
    libraryPanelShowDetail: {
      title: '复选框',
      icon: () => (
        <>
          <ElIcon size={16}>
            <i-ep-aim />
          </ElIcon>
        </>
      ),
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
    direction: createLibraryComponentPropItem({
      title: '排列方式',
      default: 'vertical',
      selectOptions: [
        { title: '垂直', value: 'vertical' },
        { title: '水平', value: 'horizontal' },
      ],
      formType: AttributePanelFormItemInputTypeEnum.select,
      belongToPanel: AttributePanelsEnum.generic,
    }),
    shape: createLibraryComponentPropItem({
      title: '按钮形状',
      default: 'square',
      formType: AttributePanelFormItemInputTypeEnum.select,
      selectOptions: [
        { title: '方形', value: 'square' },
        { title: '圆形', value: 'round' },
      ],
      belongToPanel: AttributePanelsEnum.generic,
    }),
    choseAll: createLibraryComponentPropItem({
      title: '可全选',
      default: false,
      formType: AttributePanelFormItemInputTypeEnum.switch,
      belongToPanel: AttributePanelsEnum.generic,
    }),

    defaultData: createLibraryComponentPropItem({
      title: '默认选项',
      formType: AttributePanelFormItemInputTypeEnum.indefiniteNumberCheckBoxes,
      belongToPanel: AttributePanelsEnum.generic,
      default: [
        { name: '水果', checked: false },
        { name: '汽车', checked: true },
      ],
      labelPosition: LibraryComponentFormItemLabelPositionEnum.top,
      type: Array,
    }),
  },
  setup(props) {
    //通过实例获取refs
    const instance = getCurrentInstance()
    const checkList = ref(props.defaultData)
    const checkAll = () => {
      instance?.refs.checkboxGroupRef?.toggleAll(true)
    }
    return {
      checkAll,
      checkList,
    }
  },
}
</script>

<style lang="scss" scoped>
.test {
  pointer-events: none;
}
</style>
