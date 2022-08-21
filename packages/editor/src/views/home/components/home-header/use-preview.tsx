import { ElButton, ElDialog, ElTooltip } from 'element-plus'
import { SET_LIBRARY_COMPONENT_JSON_TREE } from '@cow-low-code/constant/src/message'
import { Info as IconInfo } from '@icon-park/vue-next'
import style from './use-preview.module.scss'
import type { MessageData } from '@cow-low-code/types/src/message'
import { useCodeStore } from '@/stores/code'
import { useSettingStore } from '@/stores/setting'

export default function usePreview() {
  const isShowDialog = ref(false)
  const iframeRef = ref<HTMLIFrameElement>()
  const codeStore = useCodeStore()
  const settingStore = useSettingStore()

  function postMessage() {
    iframeRef.value?.contentWindow?.postMessage(
      {
        msg: SET_LIBRARY_COMPONENT_JSON_TREE,
        data: JSON.stringify(toRaw(codeStore.jsonCode)),
      } as MessageData,
      '*'
    )
  }

  function onTogglePreviewDialog() {
    isShowDialog.value = !isShowDialog.value

    if (isShowDialog.value) postMessage()
  }

  return {
    onTogglePreviewDialog,
    previewComponent: defineComponent({
      setup: () => {
        let timer: NodeJS.Timer | undefined = undefined
        onMounted(() => {
          timer = setInterval(postMessage, 200)
        })
        useEventListener('message', (e: MessageEvent<MessageData>) => {
          if (!e.source || e.source === self) return undefined
          // console.log(`e.data`, e.data)
          if (timer && e.data.msg) clearInterval(timer)
        })

        //   <ElTooltip>
        //   {{
        //   default: () => <div class="el-dialog__title">预览页面</div>,
        //       content: () => <div>请先运行preview子项目</div>,
        //   }}
        // </ElTooltip>
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
                  <div class="flex items-center">
                    <span role="heading" class="el-dialog__title">
                      效果预览
                    </span>
                    <ElTooltip>
                      {{
                        content: () => (
                          <div style="font-size: 14px">
                            <p>请先正确配置预览服务地址之后再查看预览效果</p>
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
                  <iframe
                    ref={iframeRef}
                    src={settingStore.setting.previewUrl}
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
