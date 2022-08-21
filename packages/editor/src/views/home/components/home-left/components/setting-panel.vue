<template>
  <el-form :model="setting" label-position="top">
    <el-form-item>
      <template #label>
        <div class="flex items-center">
          <span>预览服务地址</span>
          <el-tooltip effect="light">
            <icon-info theme="outline" size="14" fill="#333" :stroke-width="3" class="ml-1" />
            <template #content>
              <div style="font-size: 14px">
                <p>线上默认地址：</p>
                <p>
                  <el-link @click="onClickSetPreviewUrl(previewUrlDefault.online)">{{
                    previewUrlDefault.online
                  }}</el-link>
                </p>
                <p>本地调试默认地址：</p>
                <p>
                  <el-link @click="onClickSetPreviewUrl(previewUrlDefault.dev)">{{
                    previewUrlDefault.dev
                  }}</el-link>
                </p>
              </div>
            </template>
          </el-tooltip>
        </div>
      </template>
      <el-input v-model="setting.previewUrl" />
    </el-form-item>
    <el-form-item label="退出前确认">
      <el-switch v-model="setting.confirmOnClose" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { Info as IconInfo } from '@icon-park/vue-next'
import { useSettingStore } from '@/stores/setting'

defineOptions({
  name: 'SettingPanel',
})

const settingStore = useSettingStore()
const previewUrlDefault = settingStore.previewUrlDefault
const { setting } = storeToRefs(settingStore)

function onClickSetPreviewUrl(url: string) {
  ElMessage.success(`设置成功：${url}`)
  setting.value.previewUrl = url
}
</script>

<style scoped></style>
