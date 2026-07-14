import type { T_Posting, T_PostingHouseHunterFields } from '@house-hunter/types'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// App
import { useToastsStore } from '@/stores/toasts'
import { useApi } from '@/composables/api'

export const usePostingsStore = defineStore('postings', () => {
  const { postings: apiPostings } = useApi()
  const { t } = useI18n()
  const toastsStore = useToastsStore()

  const postings = ref<Array<T_Posting>>([])
  const isLoading = ref(false)

  const searchPostings = (): void => {
    isLoading.value = true
    apiPostings
      .search()
      .then(result => postings.value = result)
      .catch(() => [])
      .finally(() => isLoading.value = false)
  }

  const updateHunterFields = async (postId: string, payload: Partial<T_PostingHouseHunterFields>): Promise<void> => {
    await apiPostings
      .pathHunterFields(postId, payload)
      .then(result => updateRecord(result))
      .catch(() => {
        toastsStore.launch({
          messages: [t('toasts.postingUpdateFailed.message')],
          title: t('toasts.postingUpdateFailed.title'),
          type: 'danger',
        })
      })
  }

  const updateRecord = (posting: T_Posting): void => {
    const index = postings.value.findIndex(p => p.id === posting.id)
    if (index !== -1) postings.value[index] = posting
  }

  return {
    updateHunterFields,
    searchPostings,
    updateRecord,
    isLoading,
    postings,
  }
})
