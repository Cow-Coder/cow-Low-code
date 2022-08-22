import { unref } from 'vue'
import {
  ElAlert,
  ElDialog,
  ElDivider,
  ElForm,
  ElFormItem,
  ElImage,
  ElInput,
  ElSpace,
  ElTabPane,
  ElTabs,
} from 'element-plus'
import stringify from 'json-stringify-pretty-compact'
import { Info as IconInfo } from '@icon-park/vue-next/lib/map'
import { cloneDeep } from 'lodash-es'
import CryptoJS from 'crypto-js/core'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import style from './use-publish.module.scss'
import type { MaybeComputedRef } from '@vueuse/shared'
import type { PageJson } from '@cow-low-code/types/src/page'
import type Monaco from '@/components/monaco-editor/use-monaco'
import MonacoEditor from '@/components/monaco-editor/index.vue'
import { useCodeStore } from '@/stores/code'
import { PREVIEW_ADDRESS } from '@/constant'
import 'crypto-js/enc-base64'

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
        const pageJson = computed<PageJson>(() => ({
          title: pageSetting.value.title,
          libraryJson: jsonCode.value,
        }))

        const pageJsonStr = computed({
          get: () => stringify(pageJson.value, { maxLength: 50 }),
          set: () => 0 === 0,
        })
        function getOnlineAddr(mockup: boolean) {
          const json = cloneDeep(pageJson.value)
          json.isPreview = mockup
          const hash = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(json)))
          return `${PREVIEW_ADDRESS}#${hash}`
        }
        function getQrcode(link: MaybeComputedRef<string>) {
          type resultSchema = {
            content: {
              url: string
            }
          }
          const url = ref('http://127.0.0.1/')
          const qrcode = useQRCode(url)
          watch(
            () => unref(link),
            (val) => {
              // 暂时不对接短链接
              return undefined
              const encodeUrl = encodeURIComponent(val as string)
              fetch(`https://www.duanlj.com//api/set.php`, {
                method: 'POST',
                body: JSON.stringify({
                  url: val,
                }),
              })
                .then((response) => response.json())
                .then((r: resultSchema) => {
                  url.value = r.content.url
                })
            },
            { immediate: true }
          )
          return qrcode
        }

        const linkWithoutMockup = computed({
          get: () => getOnlineAddr(false),
          set: () => undefined,
        })
        const imgWithoutMockup = getQrcode(linkWithoutMockup)

        const linkWithMockup = computed({
          get: () => getOnlineAddr(true),
          set: () => undefined,
        })
        const imgWithMockup = getQrcode(linkWithMockup)
        return () => (
          <ElDialog
            v-model={isShowDialog.value}
            appendToBody={true}
            title="页面发布"
            destroyOnClose={true}
          >
            {{
              default: () => (
                <ElTabs tabPosition="left">
                  <ElTabPane label="在线地址">
                    <div class={style.onlineAddress}>
                      <div class="item">
                        <ElSpace
                          direction="vertical"
                          style={{ display: 'flex' }}
                          fill={true}
                          size={'large'}
                        >
                          <h1 class="title">不带手机模型</h1>
                          <ElForm labelPosition={'top'}>
                            <ElFormItem label="地址">
                              <ElInput v-model={linkWithoutMockup.value}></ElInput>
                            </ElFormItem>
                            <ElFormItem label="二维码(暂不可用)" class="image-form-item">
                              <ElImage src={imgWithoutMockup.value}></ElImage>
                            </ElFormItem>
                          </ElForm>
                        </ElSpace>
                      </div>
                      <ElDivider direction="vertical" style={{ height: 'auto' }} />
                      <div class="item">
                        <ElSpace
                          direction="vertical"
                          style={{ display: 'flex' }}
                          fill={true}
                          size={'large'}
                        >
                          <h1 class="title">手机模型</h1>
                          <ElForm labelPosition={'top'}>
                            <ElFormItem label="地址">
                              <ElInput v-model={linkWithMockup.value}></ElInput>
                            </ElFormItem>
                            <ElFormItem label="二维码(暂不可用)" class="image-form-item">
                              <ElImage src={imgWithMockup.value}></ElImage>
                            </ElFormItem>
                          </ElForm>
                        </ElSpace>
                      </div>
                    </div>
                  </ElTabPane>

                  <ElTabPane label="自行部署">
                    <div style={{ height: '60vh' }}>
                      <ElAlert
                        title="请将此处的数据粘贴在preview模块后再进行打包"
                        closable={false}
                        showIcon
                      ></ElAlert>
                      <MonacoEditor
                        v-model={pageJsonStr.value}
                        monacoOptions={
                          {
                            language: 'json',
                          } as Monaco.editor.IStandaloneEditorConstructionOptions
                        }
                        style={{ marginTop: '20px' }}
                      />
                    </div>
                  </ElTabPane>
                </ElTabs>
              ),
            }}
          </ElDialog>
        )
      },
    }),
  }
}
