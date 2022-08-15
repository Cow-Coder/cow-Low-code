<template>
  <div ref="codeContainerRef" :class="customClass" />
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
import { throttle } from 'lodash-es'
import Monaco from './use-monaco'
import type { PropType } from 'vue'
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
  customClass: {
    type: [String, Array, Object],
    default: 'h-full w-full',
  },
})
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const codeContainerRef = ref<InstanceType<typeof HTMLElement>>()
const editorInstanceRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()
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
  editorInstanceRef,
  codeContainerRef,
  formatCode,
})
</script>
