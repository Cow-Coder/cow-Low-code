export const useTabResizeStore = defineStore(
  'TabResizeStore',
  () => {
    const tabWidthRecord = reactive<Record<string, number>>({})
    return {
      tabWidthRecord,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: sessionStorage,
          paths: ['tabWidthRecord'],
        },
      ],
    },
  }
)
