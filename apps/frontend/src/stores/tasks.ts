import { E_TASK_TYPE, type T_TaskCrawlNewPostingsWithStatus, type T_TaskCrawlNewPostings } from '@house-hunter/types'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
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
