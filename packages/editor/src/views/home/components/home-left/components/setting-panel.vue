<template>
  <a-collapse
    v-model:active-key="collapseActiveKeys"
    :bordered="false"
    expand-icon-position="right"
  >
    <a-collapse-item :key="collapseEnum.systemSetting" header="系统设置">
      <el-form :model="setting">
        <el-form-item style="display: block">
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
    </a-collapse-item>
    <a-collapse-item :key="collapseEnum.pageSetting" header="页面设置">
      <el-form>
        <el-form-item label="页面标题">
          <el-input v-model="pageSetting.title" />
        </el-form-item>
      </el-form>
    </a-collapse-item>
  </a-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Info as IconInfo } from '@icon-park/vue-next'
import { useSettingStore } from '@/stores/setting'
import { useCodeStore } from '@/stores/code'

defineOptions({
  name: 'SettingPanel',
})

enum collapseEnum {
  systemSetting = 'systemSetting',
  pageSetting = 'pageSetting',
}

const collapseActiveKeys = ref(Object.keys(collapseEnum))

const settingStore = useSettingStore()
const previewUrlDefault = settingStore.previewUrlDefault
const { setting } = storeToRefs(settingStore)
const codeStore = useCodeStore()
const { pageSetting } = storeToRefs(codeStore)

function onClickSetPreviewUrl(url: string) {
  ElMessage.success(`设置成功：${url}`)
  setting.value.previewUrl = url
}
</script>

<style lang="scss" scoped>
:deep(.arco-collapse-item-content) {
  background-color: transparent;
  padding: 0 15px 0;
}
</style>
