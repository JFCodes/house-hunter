import type { T_Ad, T_API_PAYLOAD_PatchAd } from '@house-hunter/data-model'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// App
import { useToastsStore } from '@/stores/toasts'
import { useApi } from '@/composables/api'

export const useAdsStore = defineStore('ads', () => {
  const { ads: apiAds } = useApi()
  const { t } = useI18n()
  const toastsStore = useToastsStore()

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

  const updateRecord = (adId: string, ad: T_Ad): void => {
    const index = ads.value.findIndex(item => item.id === adId)
    if (index !== -1) ads.value[index] = ad
  }

  const patch = async (adId: string, payload: T_API_PAYLOAD_PatchAd): Promise<null | T_Ad> => {
    return apiAds
      .patch(adId, payload)
      .then(result => {
        updateRecord(adId, result)
        return result
      })
      .catch(() => {
        toastsStore.launch({
          messages: [t('toasts.adUpdateFailed.message')],
          title: t('toasts.adUpdateFailed.title'),
          type: 'danger',
        })
        return null
      })
  }

  return {
    search,
    patch,
    isLoading,
    ads,
  }
})
