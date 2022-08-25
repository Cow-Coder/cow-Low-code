<script setup>
import { withBase } from 'vitepress'
import { ElImage } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-image.css'
import 'element-plus/theme-chalk/el-image-viewer.css'
const list = [
  '/img.png',
  '/img_1.png',
  '/img_2.png',
  '/img_8.png',
  '/img_3.png',
  '/img_4.png',
  '/img_6.png',
  '/img_5.png',
  '/img_7.png',
]
const imgList = list.map((img) => withBase(img))
</script>

<template>
  <div class="home-preview-block">
    <div class="home-preview">
      <h2>截图预览</h2>
      <div class="items">
        <div v-for="(img, index) in imgList" :key="index" class="item">
          <p>
            <el-image
              :src="img"
              :preview-src-list="imgList"
              :hide-on-click-modal="true"
              :initial-index="index"
            />
          </p>
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
