import { ref, watch } from 'vue'
import { toRefs } from '@vueuse/core'
import { ElInput, ElSwitch } from 'element-plus'
import type { PropType } from 'vue'
export const SwitchWithSlots = defineComponent({
  name: 'SwitchWithSlots',
  props: {
    modelValue: {
      required: true,
      type: String as PropType<string>,
    },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const tipsVal = useVModel(props, 'modelValue', emit)
    const isShow = ref(false)
    //关闭重置tipsVal
    watch(isShow, (val) => val && (tipsVal.value = ''))
    return () => (
      <>
        <ElSwitch v-model={isShow.value}></ElSwitch>
        <ElInput
          v-show={isShow.value}
          v-model={tipsVal.value}
          placeholder="请输入提示文字"
        ></ElInput>
      </>
    )
  },
})
