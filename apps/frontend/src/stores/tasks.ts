import type { T_TaskCrawlNewPostingsWithStatus } from '@house-hunter/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// App
import { useApi } from '@/composables/api'

export const useTasksStore = defineStore('tasks', () => {
  const { tasks: apiTasks } = useApi()

  const crawlNewPostingTasks = ref<Array<T_TaskCrawlNewPostingsWithStatus>>([])
  const isLoading = ref(false)

  const searchCrawlNewPostingTasks = (): void => {
    isLoading.value = true
    apiTasks
      .crawlNewPostings
      .search()
      .then(result => crawlNewPostingTasks.value = result)
      .catch(() => [])
      .finally(() => isLoading.value = false)
  }

  return {
    searchCrawlNewPostingTasks,
    crawlNewPostingTasks,
    isLoading,
  }
})
