import type { Setting } from '@/types/panel'

export const useSettingStore = defineStore(
  'SettingStore',
  () => {
    const previewUrlDefault = {
      online: 'https://cow-coder.github.io/preview-cow-low-code/',
      dev: 'http://127.0.0.1:5174',
    }
    const previewUrlPreset = import.meta.env.DEV ? previewUrlDefault.dev : previewUrlDefault.online
    const setting = ref<Setting>({
      previewUrl: previewUrlPreset,
      confirmOnClose: true,
    })

    // 刷新/退出页面确认
    watch(
      () => setting.value.confirmOnClose,
      (val) => {
        if (val) {
          window.onbeforeunload = (event) => {
            // Cancel the event as stated by the standard.
            event.preventDefault()
            // Chrome requires returnValue to be set.
            event.returnValue = ''
            // Other Browsers requires return.
            return ''
          }
        } else window.onbeforeunload = null
      }
    )
    return {
      setting,
      previewUrlDefault,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['setting'] }],
    },
  }
)
