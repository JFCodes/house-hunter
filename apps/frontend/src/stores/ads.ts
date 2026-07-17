import type { T_Ad } from '@house-hunter/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import { useApi } from '@/composables/api'

export const useAdsStore = defineStore('ads', () => {
  const { ads: apiAds } = useApi()

  const ads = ref<Array<T_Ad>>([])
  const isLoading = ref(false)

  const search = (): void => {
    isLoading.value = true
    apiAds
      .search({ page: 1, size: 100 })
      .then(result => { ads.value = result.data })
      .catch(() => [])
      .finally(() => isLoading.value = false)
  }

  return {
    search,
    isLoading,
    ads,
  }
})
