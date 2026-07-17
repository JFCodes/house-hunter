import type { T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended, T_DiscoveryTask, T_Execution } from '@house-hunter/data-model'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// App
import { useApi } from '@/composables/api'

type LastTaskExecution = T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended['payload']

export const useDiscoveryTasksStore = defineStore('discovery-tasks', () => {
  const { discoveryTasks: apiDiscoveryTasks } = useApi()

  const activeTaskExecution = ref<null | T_Execution<T_DiscoveryTask>>(null)
  const lastTaskExecution = ref<null | LastTaskExecution>(null)

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
  
  const setActiveTaskExecution = (execution: T_Execution<T_DiscoveryTask>): void => {
    activeTaskExecution.value = execution
  }

  const setLastTaskExecution = (payload: LastTaskExecution): void => {
    lastTaskExecution.value = payload
    activeTaskExecution.value = null
  }

  return {
    setActiveTaskExecution,
    setLastTaskExecution,
    search,
    activeTaskExecution,
    lastTaskExecution,
    isLoading,
    tasks,
  }
})
