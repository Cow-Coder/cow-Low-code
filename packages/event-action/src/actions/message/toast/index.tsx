import { defineComponent, markRaw, ref } from 'vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { Toast } from 'vant'
import { defineActionHandler, getActionHandleDefaultProps } from '../../../utils/util'
import useMergePropsAndConfig from '../../../hooks/use-merge-props-and-config'
import type { FormItemRule } from 'element-plus'
import 'vant/es/toast/style'

type Config = {
  content: string
}
export default defineActionHandler<Config>({
  name: 'ToastComponent',
  label: '轻量提示',
  description: '在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。',
  configPanel: markRaw(
    defineComponent({
      name: 'ToastConfigPanel',
      props: {
        ...getActionHandleDefaultProps<Config>(),
      },
      setup: (props, { expose }) => {
        const config = ref<Config>({ content: '' })
        useMergePropsAndConfig(config)
        const render = () => (
          <ElForm model={config.value}>
            <ElFormItem
              label="内容"
              rules={{ required: true, trigger: 'blur', message: '请填写内容' } as FormItemRule}
              prop="content"
            >
              <ElInput v-model={config.value.content}></ElInput>
            </ElFormItem>
          </ElForm>
        )

        function exportConfig(): Config {
          return config.value
        }
        expose({
          exportConfig,
        })
        return render
      },
    })
  ),
  handler: (config) => {
    Toast.success(config.content)
  },
  parseTip: (config) => {
    return () => (
      <>
        提示&nbsp;
        <span style={{ marginLeft: '.25rem', color: '#2468f2' }}>
          {config.content.slice(0, 5)}...
        </span>
      </>
    )
  },
})
