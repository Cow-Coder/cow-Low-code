import { ElDialog, ElTooltip } from 'element-plus'
import stringify from 'json-stringify-pretty-compact'
import { Info as IconInfo } from '@icon-park/vue-next/lib/map'
import type { PageJson } from '@cow-low-code/types/src/page'
import type Monaco from '@/components/monaco-editor/use-monaco'
import MonacoEditor from '@/components/monaco-editor/index.vue'
import { useCodeStore } from '@/stores/code'

export default function usePublish() {
  const isShowDialog = ref(false)
  return {
    togglePublishDialog: () => {
      isShowDialog.value = !isShowDialog.value
    },
    publishComponent: defineComponent({
      setup: () => {
        const codeStore = useCodeStore()
        const { pageSetting, jsonCode } = storeToRefs(codeStore)
        const pageJson = ref<PageJson>({
          title: pageSetting.value.title,
          libraryJson: jsonCode.value,
        })

        const pageJsonStr = computed({
          get: () => stringify(pageJson.value, { maxLength: 50 }),
          set: () => 0 === 0,
        })
        return () => (
          <ElDialog v-model={isShowDialog.value} appendToBody={true}>
            {{
              header: () => (
                <div class="flex items-center">
                  <span role="heading" class="el-dialog__title">
                    页面发布 - 数据导出
                  </span>
                  <ElTooltip>
                    {{
                      content: () => (
                        <div style="font-size: 14px">
                          <p>请将此处的数据粘贴在preview模块后再进行打包</p>
                        </div>
                      ),
                      default: () => (
                        <IconInfo
                          theme="outline"
                          size="16"
                          fill="#333"
                          stroke-width={4}
                          class="ml-3"
                        />
                      ),
                    }}
                  </ElTooltip>
                </div>
              ),
              default: () => (
                <div style={{ height: '60vh' }}>
                  <MonacoEditor
                    v-model={pageJsonStr.value}
                    monacoOptions={
                      {
                        language: 'json',
                      } as Monaco.editor.IStandaloneEditorConstructionOptions
                    }
                  />
                </div>
              ),
            }}
          </ElDialog>
        )
      },
    }),
  }
}
