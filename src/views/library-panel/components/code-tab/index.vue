<template>
  <div ref="codeContainerRef" class="code-container h-full w-full" />
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
import * as Monaco from 'monaco-editor'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import { throttle } from 'lodash-es'
import { useCodeStore } from '@/stores/code'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new JsonWorker()
    }
    return new EditorWorker()
  },
}

const codeStore = useCodeStore()
const { jsonCode } = storeToRefs(codeStore)
const codeContainerRef = ref<InstanceType<typeof HTMLElement>>()
const editorInstanceRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()
let editorTextModel: Monaco.editor.ITextModel | null = null
const formatCode = throttle(() => {
  if (!editorInstanceRef.value) return false
  editorInstanceRef.value.getAction('editor.action.formatDocument').run()
}, 0)
onMounted(() => {
  editorInstanceRef.value = Monaco.editor.create(codeContainerRef.value!, {
    value: '',
    language: 'json',
    automaticLayout: true, //开启自适应大小
    minimap: {
      enabled: false, // 不需要小的缩略图
    },
    lineNumbers: 'off', //关闭显示行号
    folding: false, //关闭折叠
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
  })
  /**
   * An event emitted when the content of the current model has changed.
   */
  editorInstanceRef.value.onDidChangeModelContent((e) => {
    formatCode()
  })
  /**
   * 第一次点开时候虽然调用了，但是Monaco并没有相应格式化操作，所以这里延迟一下
   */
  setTimeout(() => formatCode(), 50)
  editorTextModel = editorInstanceRef.value.getModel()
  watch(
    jsonCode,
    (value) => {
      if (!editorTextModel) return false
      editorTextModel.setValue(JSON.stringify(value))
    },
    { immediate: true, deep: true }
  )
})
</script>

<script lang="ts">
export default {
  name: 'CodePanel',
}
</script>

<style scoped></style>
