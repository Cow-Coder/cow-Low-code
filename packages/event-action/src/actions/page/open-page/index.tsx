import { defineComponent, markRaw, reactive, ref, toRaw } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElRadioButton,
  ElRadioGroup,
  ElSwitch,
  type FormItemRule,
  type FormRules,
} from 'element-plus'
import {
  defineActionHandler,
  getActionHandleDefaultProps,
} from '@cow-low-code/event-action/src/utils/util'

enum ModeEnum {
  jumpLink = 'jumpLink',
  openPage = 'openPage',
}

type JumpLinkConfig = {
  url: string
  blank: boolean
}

type OpenPageConfig = {
  path: string
}

/**
 * 需要存储到物料组件实例身上的数据结构
 *
 * @example
 *     "eventTriggers": {
 *       "click": {
 *         "actions": [
 *           {
 *             "actionName": "OpenPage",
 *             "config": {
 *               "openMode": "jumpLink",
 *               // 下面的就是Config的结构
 *               "config": {
 *                 "url": "http://127.0.0.1:5173/",
 *                 "blank": true
 *               }
 *             }
 *           }
 *         ]
 *       }
 *     }
 */
type Config = {
  openMode: ModeEnum
  config: JumpLinkConfig | OpenPageConfig
}

/**
 * 这里的泛型是为了提示handle和parseTip的参数
 */
export default defineActionHandler<Config>({
  name: 'OpenPage',
  label: '打开页面',
  description: '打开/跳转至指定页面',
  /**
   * markRaw标记为非响应式
   * @link https://staging-cn.vuejs.org/api/reactivity-advanced.html#markraw
   */
  configPanel: markRaw(
    defineComponent({
      name: 'OpenPageConfigPanel',
      props: {
        ...getActionHandleDefaultProps<Config>(),
      },
      setup(props, { expose }) {
        const chooseModeValue = ref<ModeEnum>()
        const chooseModeRef = ref<InstanceType<typeof ElForm>>()
        const formRef = ref<InstanceType<typeof ElForm>>()
        const rulesJumpLink = reactive<FormRules>({
          url: [
            { required: true, message: '必填项目', trigger: 'blur' },
            { pattern: /^http/i, message: '必须是URL链接', trigger: 'blur' },
          ],
        })
        const config = ref({
          [ModeEnum.jumpLink]: {
            url: '',
            blank: true,
          } as JumpLinkConfig,
          [ModeEnum.openPage]: {
            path: '',
          } as OpenPageConfig,
        })

        /**
         * 如果是编辑的话
         */
        if (props.actionConfig?.openMode) {
          const actionConfig = toRaw(props.actionConfig)
          chooseModeValue.value = actionConfig.openMode
          if (actionConfig.openMode === ModeEnum.openPage)
            config.value[actionConfig.openMode] = actionConfig.config as OpenPageConfig
          else config.value[actionConfig.openMode] = actionConfig.config as JumpLinkConfig
        }

        const render = () => (
          <>
            <ElForm model={{ value: chooseModeValue.value }} ref={chooseModeRef}>
              <ElFormItem
                label="打开模式"
                rules={{ required: true, message: '请选择一项', trigger: 'blur' } as FormItemRule}
                prop="value"
              >
                <ElRadioGroup v-model={chooseModeValue.value}>
                  <ElRadioButton label={ModeEnum.jumpLink}>跳转链接</ElRadioButton>
                  <ElRadioButton label={ModeEnum.openPage}>打开页面</ElRadioButton>
                </ElRadioGroup>
              </ElFormItem>
            </ElForm>
            {chooseModeValue.value === ModeEnum.jumpLink ? (
              <ElForm ref={formRef} model={config.value[ModeEnum.jumpLink]} rules={rulesJumpLink}>
                <ElFormItem label="页面地址" prop="url">
                  <ElInput v-model={config.value[ModeEnum.jumpLink].url}></ElInput>
                </ElFormItem>
                <ElFormItem label="新窗口打开" prop="blank">
                  <ElSwitch v-model={config.value[ModeEnum.jumpLink].blank}></ElSwitch>
                </ElFormItem>
              </ElForm>
            ) : undefined}
            {chooseModeValue.value === ModeEnum.openPage ? (
              <ElForm ref={formRef} model={config.value[ModeEnum.jumpLink]}>
                <ElFormItem label="打开啥子页面哦，还没写呐">
                  <ElInput></ElInput>
                </ElFormItem>
              </ElForm>
            ) : undefined}
          </>
        )

        async function exportConfig(): Promise<Config | boolean> {
          try {
            await chooseModeRef.value?.validate()
            if (!chooseModeValue.value || !formRef.value) return false
            let isValid = false
            await formRef.value?.validate((ok) => (isValid = ok))
            if (!isValid) return false
            return {
              openMode: chooseModeValue.value,
              config: config.value[chooseModeValue.value],
            }
          } catch {}
          return false
        }

        /**
         * 如果此action有配置属性则必须要导出名为 `exportConfig` 的函数
         * dialog会调用此函数来获取config的值
         */
        expose({
          exportConfig,
        })
        return render
      },
    })
  ),
  handler(props) {
    function handle(config: JumpLinkConfig): void
    function handle(config: OpenPageConfig): void
    function handle(config: OpenPageConfig | JumpLinkConfig) {
      if ('url' in config) {
        config.blank ? window.open(config.url) : window.location.assign(config.url)
      } else {
        ElMessage.error('还没有开发嘞')
      }
    }

    if (props.openMode === ModeEnum.openPage) handle(props.config as OpenPageConfig)
    if (props.openMode === ModeEnum.jumpLink) handle(props.config as JumpLinkConfig)
  },
  parseTip(config) {
    let link = '',
      tip = ''
    if (config.openMode === ModeEnum.openPage) {
      const openPageConfig = config.config as OpenPageConfig
      tip = '打开'
      link = openPageConfig.path
    } else {
      const jumpConfig = config.config as JumpLinkConfig
      tip = '跳转至'
      link = jumpConfig.url
    }
    return () => (
      <>
        {tip}
        <span style={{ marginLeft: '.25rem', color: '#2468f2' }}>{link}</span>
      </>
    )
  },
})
