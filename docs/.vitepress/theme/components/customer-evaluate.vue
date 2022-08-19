<template>
  <div class="customer-evaluate">
    <div v-for="i in 13" :key="i" class="item">
      <ZoomImg :src="`/customer-${i}.png`" />
    </div>
  </div>
</template>

<style scoped>
.customer-evaluate {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.customer-evaluate .item {
  width: 100%;
  padding: 8px;
  padding: 8px;
  display: inline-flex;
}

.customer-evaluate .item p {
  width: 100%;
  margin: 0;
  padding: 10px;
  background-color: var(--vp-c-bg-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.customer-evaluate .item p :deep(img) {
  object-fit: contain;
}

@media (min-width: 640px) {
  .customer-evaluate .item {
    width: calc(100% / 3);
  }

  .customer-evaluate .item p :deep(img) {
    max-height: 100px;
  }
}

@media (min-width: 960px) {
  .customer-evaluate .item {
    width: calc(100% / 5);
  }
}
</style>
