import { ElButton, ElInput } from 'element-plus'
import $style from './index.module.scss'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'Stepper',
  props: {
    modelValue: {
      required: false,
      type: String as PropType<string>,
    },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const tipsVal = useVModel(props, 'modelValue', emit)
    const increase = () => {
      if (tipsVal.value == undefined) {
        tipsVal.value = '1'
      } else {
        tipsVal.value = (Number.parseInt(tipsVal.value) + 1).toString()
      }
    }
    const decrease = () => {
      if (tipsVal.value == undefined) {
        tipsVal.value = '1'
      } else {
        tipsVal.value = (Number.parseInt(tipsVal.value) - 1).toString()
      }
    }
    return () => (
      <>
        <div class={[$style.stepper__inputGroup]}>
          <ElButton onClick={decrease}>-</ElButton>
          <ElInput v-model={tipsVal.value}></ElInput>
          <ElButton onClick={increase}>+</ElButton>
        </div>
      </>
    )
  },
})
