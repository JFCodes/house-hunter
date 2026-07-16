import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  T_TASK_CrawlNewPostings,
  T_TaskExecutionResult,
  T_TaskExecution,
} from '@house-hunter/types'
// App
import { useApi } from '@/composables/api'

type LastTaskExecution = {
  result: Omit<T_TaskExecutionResult, 'postings'>
  execution: T_TaskExecution
}

export const useTasksStore = defineStore('tasks', () => {
  const { tasks: apiTasks } = useApi()

  const activeTaskExecution = ref<null | T_TaskExecution>(null)
  const lastTaskExecution = ref<null | LastTaskExecution>(null)

  const crawlNewPostingTasks = ref<Array<T_TASK_CrawlNewPostings>>([])
  const isLoading = ref(false)

  const setActiveTaskExecution = (execution: T_TaskExecution): void => {
    activeTaskExecution.value = execution
  }

  const setLastTaskExecution = (execution: T_TaskExecution, result: Omit<T_TaskExecutionResult, 'postings'>): void => {
    lastTaskExecution.value = { execution, result }
    activeTaskExecution.value = null
  }

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
    setActiveTaskExecution,
    setLastTaskExecution,
    crawlNewPostingTasks,
    activeTaskExecution,
    lastTaskExecution,
    isLoading,
  }
})
