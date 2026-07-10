import type { T_Posting } from '@house-hunter/types'
import { ref } from 'vue'
import { defineStore } from 'pinia'
// App
import { useApi } from '@/composables/api'

export const usePostingsStore = defineStore('postings', () => {
  const { postings: apiPostings } = useApi()

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

  return {
    searchPostings,
    isLoading,
    postings,
  }
})
