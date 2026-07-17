import type { T_DiscoveryTask } from '@house-hunter/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// App
import { useApi } from '@/composables/api'

export const useDiscoveryTasksStore = defineStore('discovery-tasks', () => {
  const { discoveryTasks: apiDiscoveryTasks } = useApi()

  const tasks = ref<Array<T_DiscoveryTask>>([])
  const isLoading = ref(false)

  const search = (): void => {
    isLoading.value = true
    apiDiscoveryTasks
      .get()
      .then(result => { tasks.value = result })
      .catch(() => [])
      .finally(() => isLoading.value = false)
  }
  
  return {
    search,
    tasks,
    isLoading
  }

  // const activeTaskExecution = ref<null | T_TaskExecution>(null)
  // const lastTaskExecution = ref<null | LastTaskExecution>(null)

  // const crawlNewPostingTasks = ref<Array<T_TASK_CrawlNewPostings>>([])

  // const setActiveTaskExecution = (execution: T_TaskExecution): void => {
  //   activeTaskExecution.value = execution
  // }

  // const setLastTaskExecution = (execution: T_TaskExecution, result: Omit<T_TaskExecutionResult, 'postings'>): void => {
  //   lastTaskExecution.value = { execution, result }
  //   activeTaskExecution.value = null
  // }



  // return {
  //   searchCrawlNewPostingTasks,
  //   setActiveTaskExecution,
  //   setLastTaskExecution,
  //   crawlNewPostingTasks,
  //   activeTaskExecution,
  //   lastTaskExecution,
  //   isLoading,
  // }
})
