import { ElButton, ElDialog, ElTooltip } from 'element-plus'
import { SET_LIBRARY_COMPONENT_JSON_TREE } from '@cow-low-code/constant/src/message'
import style from './use-preview.module.scss'
import type { MessageData } from '@cow-low-code/types/src/message'
import { useCodeStore } from '@/stores/code'

export default function usePreview() {
  const isShowDialog = ref(true)
  const iframeRef = ref<HTMLIFrameElement>()
  const codeStore = useCodeStore()

  function onTogglePreviewDialog() {
    isShowDialog.value = !isShowDialog.value

    if (isShowDialog.value)
      iframeRef.value?.contentWindow?.postMessage(
        {
          msg: SET_LIBRARY_COMPONENT_JSON_TREE,
          data: toRaw(codeStore.jsonCode),
        } as MessageData,
        '*'
      )
  }
  return {
    onTogglePreviewDialog,
    previewComponent: defineComponent({
      setup: () => {
        let timer: NodeJS.Timer | undefined = undefined
        onMounted(() => {
          timer = setInterval(() => {
            iframeRef.value?.contentWindow?.postMessage(
              {
                msg: SET_LIBRARY_COMPONENT_JSON_TREE,
                data: toRaw(codeStore.jsonCode),
              } as MessageData,
              '*'
            )
          }, 200)
        })
        useEventListener('message', (e: MessageEvent<MessageData>) => {
          if (!e.source || e.source === self) return undefined
          console.log(`e.data`, e.data)
          if (timer && e.data.msg) clearInterval(timer)
        })
        return () => (
          <div v-element-dialog-resize={{ draggable: true, fullscreen: true }}>
            <ElDialog
              v-model={isShowDialog.value}
              appendToBody={true}
              lockScroll={false}
              closeOnClickModal={false}
              width={550}
              top="5vh"
              customClass={style.previewDialog}
            >
              {{
                header: () => (
                  <ElTooltip>
                    {{
                      default: () => <div class="el-dialog__title">预览页面</div>,
                      content: () => <div>请先运行preview子项目</div>,
                    }}
                  </ElTooltip>
                ),
                default: () => (
                  <iframe
                    ref={iframeRef}
                    src="http://127.0.0.1:5173"
                    style={{ height: 'calc(100vh - 20vh)', width: '100%' }}
                  ></iframe>
                ),
              }}
            </ElDialog>
          </div>
        )
      },
    }),
  }
}
