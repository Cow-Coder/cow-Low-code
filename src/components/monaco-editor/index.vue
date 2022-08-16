<template>
  <div ref="monacoWrapperRef" :class="[customClass, $style.monacoWrapper]">
    <div v-show="allowFullscreen" class="monaco-fullscreen">
      <expand-text-input
        v-show="!fullscreen"
        class="icon"
        theme="outline"
        size="19"
        fill="#333"
        :stroke-width="3"
        @click="onToggleFullscreen"
      />
      <collapse-text-input
        v-show="fullscreen"
        class="icon"
        theme="outline"
        size="19"
        fill="#333"
        :stroke-width="3"
        @click="onToggleFullscreen"
      />
    </div>
    <div ref="codeContainerRef" class="h-full w-full" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from 'vue'
import { CollapseTextInput, ExpandTextInput } from '@icon-park/vue-next'
import { isUndefined, throttle } from 'lodash-es'
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
    default: () => ({} as Monaco.editor.IStandaloneEditorConstructionOptions),
  },
  modelValue: {
    type: String,
    default: '',
  },
  customClass: {
    type: [String, Array, Object],
    default: 'h-full w-full',
  },
  allowFullscreen: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'update:fullscreen'])
const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const codeContainerRef = ref<InstanceType<typeof HTMLElement>>()
const monacoWrapperRef = ref<InstanceType<typeof HTMLElement>>()
const editorInstanceRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()
function formatCode() {
  requestAnimationFrame(() => {
    editorInstanceRef.value?.getAction('editor.action.formatDocument').run()
  })
}

const fullscreen = useVModel(props, 'fullscreen', emit, { passive: true })
function onToggleFullscreen() {
  if (isUndefined(monacoWrapperRef.value)) return undefined
  if (isUndefined(codeContainerRef.value)) return undefined
  if (fullscreen.value) {
    // 缩小
    monacoWrapperRef.value.style.position = ''
    monacoWrapperRef.value.style.width = ''
    monacoWrapperRef.value.style.height = ''
    monacoWrapperRef.value.style.inset = ''

    codeContainerRef.value.style.position = ''
    codeContainerRef.value.style.width = ''
    codeContainerRef.value.style.height = ''
    codeContainerRef.value.style.inset = ''
  } else {
    // 放大
    monacoWrapperRef.value.style.position = 'fixed'
    monacoWrapperRef.value.style.width = 'auto'
    monacoWrapperRef.value.style.height = 'auto'
    monacoWrapperRef.value.style.inset = '0'

    codeContainerRef.value.style.position = 'fixed'
    codeContainerRef.value.style.width = 'auto'
    codeContainerRef.value.style.height = 'auto'
    codeContainerRef.value.style.inset = '0'
  }
  fullscreen.value = !fullscreen.value
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

<style lang="scss" module>
.monacoWrapper {
  @apply relative;
  :global {
    .monaco-fullscreen {
      @apply absolute z-50;
      right: 30px;
      top: 20px;
      .icon {
        @apply cursor-pointer;
      }
    }
    .monaco-fullscreen.is-minimap {
      right: 30px;
    }
  }
}
</style>
