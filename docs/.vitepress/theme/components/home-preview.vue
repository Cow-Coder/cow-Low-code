<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <div class="home-preview-block">
    <div class="home-preview">
      <h2>截图预览</h2>
      <div class="items">
        <div class="item">
          <zoom-img src="/img.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_1.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_2.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_8.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_3.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_4.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_6.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_5.png" />
        </div>
        <div class="item">
          <zoom-img src="/img_7.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-preview-block {
  padding: 0 24px;
}

.home-preview {
  max-width: 1152px;
  margin: 50px auto 0;
}

.home-preview h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.home-preview .items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.home-preview .items .item {
  width: 100%;
  padding: 8px;
}

.home-preview .items .item p {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.home-preview .items .item p :deep(img) {
  border: 1px solid var(--vp-c-divider);
}

@media (min-width: 640px) {
  .home-preview-block {
    padding: 0 48px;
  }

  .home-preview .items .item {
    width: calc(100% / 2);
  }
}

@media (min-width: 960px) {
  .home-preview-block {
    padding: 0 64px;
  }

  .home-preview .items .item {
    width: calc(100% / 3);
  }
}
</style>
