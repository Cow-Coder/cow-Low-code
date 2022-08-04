<template>
  <div ref="codeContainerRef" class="code-container h-full w-full"></div>
</template>

<script lang="ts" setup>
import * as Monaco from "monaco-editor";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") {
      return new JsonWorker();
    }
    return new EditorWorker();
  },
};
import { useCodeStore } from "@/stores/code";
import { storeToRefs } from "pinia";
import { onMounted, ref, shallowRef, watch } from "vue";
import { debounce } from "lodash-es";

const codeStore = useCodeStore();
const { jsonCode } = storeToRefs(codeStore);
const codeContainerRef = ref<InstanceType<typeof HTMLElement>>();
const editorInstanceRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>();
let editorTextModel: Monaco.editor.ITextModel | null = null;
const formatCode = debounce(() => {
  if (!editorInstanceRef.value) return false;
  editorInstanceRef.value.getAction("editor.action.formatDocument").run();
}, 0);
onMounted(() => {
  editorInstanceRef.value = Monaco.editor.create(codeContainerRef.value!, {
    value: "",
    language: "json",
    automaticLayout: true, //开启自适应大小
    minimap: {
      enabled: false, // 不需要小的缩略图
    },
    lineNumbers: "off", //关闭显示行号
    folding: false, //关闭折叠
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
  });
  /**
   * An event emitted when the content of the current model has changed.
   */
  editorInstanceRef.value.onDidChangeModelContent((e) => {
    formatCode();
  });
  editorTextModel = editorInstanceRef.value.getModel();
  watch(
    jsonCode,
    (value) => {
      if (!editorTextModel) return false;
      editorTextModel.setValue(JSON.stringify(value));
    },
    { immediate: true, deep: true }
  );
});
</script>

<script lang="ts">
export default {
  name: "CodePanel",
};
</script>

<style scoped></style>
