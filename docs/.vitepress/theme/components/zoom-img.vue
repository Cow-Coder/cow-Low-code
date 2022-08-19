<script setup>
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import mediumZoom from 'medium-zoom'

defineProps({
  src: String,
})

const imgRef = ref(null)

onMounted(() => {
  mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' })
})
</script>

<template>
  <p>
    <img ref="imgRef" :src="withBase(src)" />
  </p>
</template>

<style>
.medium-zoom-overlay {
  z-index: 200;
}

.medium-zoom-image {
  z-index: 9;
}

.medium-zoom-image--opened {
  z-index: 201;
}
</style>
