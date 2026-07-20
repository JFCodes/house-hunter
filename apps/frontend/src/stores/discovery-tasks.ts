import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import type {
  T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended,
  T_API_PAYLOAD_PatchDiscoveryTask,
  T_DiscoveryTask,
  T_Execution
} from '@house-hunter/data-model'
// App
import { useToastsStore } from '@/stores/toasts'
import { useApi } from '@/composables/api'

type LastTaskExecution = T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended['payload']

export const useDiscoveryTasksStore = defineStore('discovery-tasks', () => {
  const { discoveryTasks: apiDiscoveryTasks } = useApi()
  const { t } = useI18n()
  const toastsStore = useToastsStore()

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

  const updateRecord = (taskId: string, task: T_DiscoveryTask): void => {
    const index = tasks.value.findIndex(item => item.id === taskId)
    if (index !== -1) tasks.value[index] = task
  }

  const patch = async (adId: string, payload: T_API_PAYLOAD_PatchDiscoveryTask): Promise<null | T_DiscoveryTask> => {
    return apiDiscoveryTasks
      .patch(adId, payload)
      .then(result => {
        updateRecord(adId, result)
        return result
      })
      .catch(() => {
        toastsStore.launch({
          messages: [t('toasts.taskUpdateFailed.message')],
          title: t('toasts.taskUpdateFailed.title'),
          type: 'danger',
        })
        return null
      })
  }

  return {
    setActiveTaskExecution,
    setLastTaskExecution,
    search,
    patch,
    activeTaskExecution,
    lastTaskExecution,
    isLoading,
    tasks,
  }
})
