import { defineComponent, markRaw, nextTick, onMounted, reactive, ref, toRaw, watch } from 'vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { useElementBounding } from '@vueuse/core'
import { defineActionHandler, getActionHandleDefaultProps } from '../../../utils/util'
import useMergePropsAndConfig from '../../../hooks/use-merge-props-and-config'
import type { FormItemRule } from 'element-plus'

type Config = {
  /**
   * 执行的js
   */
  js: string
  /**
   * 动作名称
   */
  label: string
}

const defaultExecJS = `
// 这里的代码会在对应动作执行器中的一个匿名函数里执行
// 此函数有四个参数，分别是
// 1. config 动作执行器的配置参数
// 2. libraryComponentInstanceTree 物料组件实例树
// 3. libraryComponentSchemaMap 物料组件结构定义的键值对
// 4. libraryComponentInstanceRefMap 物料组件实例ref的哈希表
`

export default defineActionHandler<Config>({
  name: 'JavaScript',
  label: '自定义JS',
  description: '通过JavaScript自定义动作逻辑',
  configPanel: markRaw(
    defineComponent({
      name: 'JavascriptConfigPanel',
      props: {
        ...getActionHandleDefaultProps<Config>(),
      },
      setup: (props, { expose }) => {
        const config = ref<Config>({ js: defaultExecJS, label: '' })
        useMergePropsAndConfig(config)
        if (!props.monacoEditorComponent)
          throw new TypeError("$attrs['monaco-editor-component'] 不能为undefined")

        const monacoDefaultWidth =
          'calc((var(--el-dialog-width) - var(--el-dialog-padding-primary) * 2) / 4 * 3 - 10px * 2 - 2rem - 15px)'
        const monacoWidth = ref(monacoDefaultWidth)
        function onMonacoFullscreen(full: boolean) {
          if (full) monacoWidth.value = '100%'
          else monacoWidth.value = monacoDefaultWidth
        }
        const Monaco = toRaw(props.monacoEditorComponent) as any
        const render = () => (
          <>
            <ElForm model={config.value}>
              <ElFormItem
                label="动作名"
                rules={{ required: true, trigger: 'blur', message: '请填写内容' } as FormItemRule}
                prop="js"
              >
                <ElInput v-model={config.value.label} placeholder="自定义动作名称"></ElInput>
              </ElFormItem>
            </ElForm>
            <Monaco
              v-model={config.value.js}
              customClass="flex-grow"
              onFullscreen={onMonacoFullscreen}
              style={{
                height: '250px',
                width: monacoWidth.value,
              }}
            ></Monaco>
          </>
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
  handler: (
    config,
    libraryComponentInstanceTree,
    libraryComponentSchemaMap,
    libraryComponentInstanceRefMap
  ) => {
    try {
      const fn = new Function(
        'config',
        'libraryComponentInstanceTree',
        'libraryComponentSchemaMap',
        'libraryComponentInstanceRefMap',
        config.js
      )
      fn(
        config,
        libraryComponentInstanceTree,
        libraryComponentSchemaMap,
        libraryComponentInstanceRefMap
      )
    } catch (e) {
      console.error(`自定义JS运行失败：${config.label}`, e)
    }
  },
  parseTip: (config) => {
    return () => (
      <>
        执行自定义js&nbsp;
        {config.label !== '' ? (
          <span style={{ marginLeft: '.25rem', color: '#2468f2' }}>{config.label}</span>
        ) : undefined}
      </>
    )
  },
})
