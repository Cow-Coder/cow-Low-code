import { defineComponent, markRaw, ref } from 'vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import copy from 'copy-to-clipboard'
import { Toast } from 'vant'
import { defineActionHandler, getActionHandleDefaultProps } from '../../../utils/util'
import useMergePropsAndConfig from '../../../hooks/use-merge-props-and-config'
import type { FormItemRule } from 'element-plus'
import 'vant/es/toast/style'

type Config = {
  content: string
}
export default defineActionHandler<Config>({
  name: 'Copy',
  label: '复制内容',
  description: '复制文本内容至粘贴板',
  configPanel: markRaw(
    defineComponent({
      name: 'CopyConfigPanel',
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
    copy(config.content)
    Toast.success('复制成功')
  },
  parseTip: (config) => {
    return () => (
      <>
        复制&nbsp;
        <span style={{ marginLeft: '.25rem', color: '#2468f2' }}>
          {config.content.slice(0, 5)}...
        </span>
        &nbsp;至粘贴板
      </>
    )
  },
})
