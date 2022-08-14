<template>
  <div ref="codeContainerRef" class="h-full w-full" />
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
/**
 * Using Vite
 * @link https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#using-vite
 */
import * as Monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { throttle } from 'lodash-es'
import type { PropType } from 'vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new JsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new CssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new HtmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new TSWorker()
    }
    return new EditorWorker()
  },
}

defineOptions({
  name: 'MonacoEditor',
})
const props = defineProps({
  autoFormat: {
    type: Boolean,
    default: false,
  },
  monacoOptions: {
    type: Object as PropType<Monaco.editor.IStandaloneEditorConstructionOptions>,
    default: () => ({}),
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const codeContainerRef = ref<InstanceType<typeof HTMLElement>>()
const editorInstanceRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()

const modelValue = useVModel(props, 'modelValue')

const codeContainerRef = ref<InstanceType<typeof HTMLElement>>()
const editorInstanceRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()
const editorTextModel = ref<Monaco.editor.ITextModel>()

function formatCode() {
  requestAnimationFrame(() => {
    editorInstanceRef.value?.getAction('editor.action.formatDocument').run()
  })
}

watch(
  modelValue,
  throttle(() => {
    const content = editorInstanceRef.value?.getValue()
    if (modelValue.value !== content) editorInstanceRef.value?.setValue(modelValue.value)
  })
  (value) => {
    editorTextModel.value?.setValue(value)
  },
  { deep: true }
)

onMounted(() => {
  editorInstanceRef.value = Monaco.editor.create(codeContainerRef.value!, {
    value: modelValue.value,
    language: 'javascript',
    automaticLayout: true, //开启自适应大小
    minimap: {
      enabled: false, // 不需要小的缩略图
    },
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
    ...props.monacoOptions,
  })
  if (props.autoFormat) {
    /**
     * An event emitted when the content of the current model has changed.
     */
    editorInstanceRef.value.onDidChangeModelContent(() => {
      formatCode()
    })
  }

  editorInstanceRef.value?.onDidChangeModelContent(
    throttle(() => {
      modelValue.value = editorInstanceRef.value!.getValue()!
    })
  )
})

defineExpose({
  editorTextModel.value = editorInstanceRef.value.getModel()!
})

defineExpose({
  editorTextModel,
  editorInstanceRef,
  codeContainerRef,
  formatCode,
})
</script>
