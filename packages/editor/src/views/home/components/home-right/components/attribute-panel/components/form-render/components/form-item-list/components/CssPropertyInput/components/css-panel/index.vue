<template>
  <div>
    <ElForm
      label-position="left"
      label-width="100px"
      style="max-width: 460px"
      class="max-h-72 overflow-y-auto"
    >
      <el-form-item v-for="item of cssPanelData" :key="item.title">
        <p>{{ item.title }}</p>
        <ElDivider class="mb-1 mt-3" />
        <div class="flex flex-col">
          <el-form-item v-for="info of item.data" :key="info.label">
            <div class="flex flex-nowrap">
              <div class="whitespace-nowrap flex items-center w-10">{{ info.label }}</div>
              <div v-for="button of info.data" :key="button.name">
                <div
                  v-if="info.label != '置无'"
                  class="customButton"
                  :class="[
                    cssData[`${item.title}${info.label}`]?.[0] == button.value
                      ? 'activeButton'
                      : '',
                    button?.bgColor != null ? button.bgColor : '',
                  ]"
                  @click="updateCssCallback(button.value, item.title + info.label)"
                >
                  {{ button.name }}
                </div>
                <div
                  v-else
                  class="customButton"
                  :class="[
                    cssData[`${item.title}${info.label}`]?.[0] == button.value
                      ? 'activeButton'
                      : '',
                  ]"
                  @click="resetCssCallback(button.value, item.title, item.title + info.label)"
                >
                  {{ button.name }}
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form-item>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    required: true,
    type: Object,
  },
})
const emit = defineEmits(['update:modelValue'])
const cssData = useVModel(props, 'modelValue', emit)
//更新
const updateCssCallback = (property: string, flag: string) => {
  if (cssData.value[flag]?.[0] == property) {
    delete cssData.value[flag]
  } else {
    if (cssData.value[flag]) {
      cssData.value[flag][0] = property
      return
    }
    cssData.value[flag] = [property]
  }
}
//重置
const resetCssCallback = (property: string, title: string, flag: string) => {
  if (cssData.value[flag]?.[0] == property) {
    delete cssData.value[flag]
  } else {
    for (const labelKey in cssData.value) {
      if (labelKey.includes(title)) delete cssData.value[labelKey]
    }
    cssData.value[flag] = [property]
  }
}
const cssPanelData = [
  {
    title: '外边距',
    data: [
      {
        label: '整体',
        data: [
          { name: '极小', value: 'm-0.5' },
          { name: '小', value: 'm-1' },
          { name: '中', value: 'm-1.5' },
          { name: '大', value: 'm-2' },
        ],
      },
      {
        label: '上边距',
        data: [
          { name: '极小', value: 'mt-0.5' },
          { name: '小', value: 'mt-1' },
          { name: '中', value: 'mt-1.5' },
          { name: '大', value: 'mt-2' },
        ],
      },
      {
        label: '下边距',
        data: [
          { name: '极小', value: 'mb-0.5' },
          { name: '小', value: 'mb-1' },
          { name: '中', value: 'mb-1.5' },
          { name: '大', value: 'mb-2' },
        ],
      },
      {
        label: '左边距',
        data: [
          { name: '极小', value: 'ml-0.5' },
          { name: '小', value: 'ml-1' },
          { name: '中', value: 'ml-1.5' },
          { name: '大', value: 'ml-2' },
        ],
      },
      {
        label: '右边距',
        data: [
          { name: '极小', value: 'mr-0.5' },
          { name: '小', value: 'mr-1' },
          { name: '中', value: 'mr-1.5' },
          { name: '大', value: 'mr-2' },
        ],
      },
      {
        label: '置无',
        data: [{ name: '整体', value: 'm-none' }],
      },
    ],
  },
  {
    title: '内边距',
    data: [
      {
        label: '整体',
        data: [
          { name: '极小', value: 'p-0.5' },
          { name: '小', value: 'p-1' },
          { name: '中', value: 'p-1.5' },
          { name: '大', value: 'p-2' },
        ],
      },
      {
        label: '上边距',
        data: [
          { name: '极小', value: 'pt-0.5' },
          { name: '小', value: 'pt-1' },
          { name: '中', value: 'pt-1.5' },
          { name: '大', value: 'pt-2' },
        ],
      },
      {
        label: '下边距',
        data: [
          { name: '极小', value: 'pb-0.5' },
          { name: '小', value: 'pb-1' },
          { name: '中', value: 'pb-1.5' },
          { name: '大', value: 'pb-2' },
        ],
      },
      {
        label: '左边距',
        data: [
          { name: '极小', value: 'pl-0.5' },
          { name: '小', value: 'pl-1' },
          { name: '中', value: 'pl-1.5' },
          { name: '大', value: 'pl-2' },
        ],
      },
      {
        label: '右边距',
        data: [
          { name: '极小', value: 'pr-0.5' },
          { name: '小', value: 'pr-1' },
          { name: '中', value: 'pr-1.5' },
          { name: '大', value: 'pr-2' },
        ],
      },
      {
        label: '置无',
        data: [{ name: '整体', value: 'p-none' }],
      },
    ],
  },
  {
    title: '边框',
    data: [
      {
        label: '位置',
        data: [
          { name: '全部', value: 'border' },
          { name: '上', value: 'border-t' },
          { name: '下', value: 'border-b' },
          { name: '左', value: 'border-l' },
          { name: '右', value: 'border-r' },
        ],
      },
      {
        label: '大小',
        data: [
          { name: '2x', value: 'border-2' },
          { name: '4x', value: 'border-4' },
          { name: '8x', value: 'border-8' },
        ],
      },
      {
        label: '颜色',
        data: [
          { name: '基础', value: 'border-blue-500', bgColor: 'bg-blue-500' },
          { name: '警告', value: 'border-yellow-500', bgColor: 'bg-yellow-500' },
          { name: '危险', value: 'border-red-500', bgColor: 'bg-red-500' },
          { name: '成功', value: 'border-green-500', bgColor: 'bg-green-500' },
        ],
      },
      {
        label: '置无',
        data: [{ name: '整体', value: 'border-none' }],
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
// 自定义按钮
.customButton {
  @apply rounded-md border-2 border-gray-200 m-2 px-2;
  white-space: nowrap;
  &:hover {
    @apply border-2 border-gray-300;
    transform: scale(1.09);
    transition: all ease 0.5s;
    cursor: pointer;
  }
}
.activeButton {
  @apply bg-gray-300 shadow-2xl border-gray-300;
}
</style>
