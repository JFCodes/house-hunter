import type { T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Started } from '@house-hunter/data-model'
import { i18n } from '@/i18n'
// App
import { useDiscoveryTasksStore } from '@/stores/discovery-tasks'
import { useToastsStore } from '@/stores/toasts'

export function onMessage (message: T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Started): void {
  const { t } = i18n.global
  const { task } = message.payload.execution

  useDiscoveryTasksStore().setActiveTaskExecution(message.payload.execution)
  useToastsStore().launch({
    type: 'success',
    title: t('toasts.taskStarted.title'),
    messages: [
      t('toasts.discoveryAdsTaskStarted.message', { target: task.target.toUpperCase() })
    ]
  })
}
