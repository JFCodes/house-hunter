import type { T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended } from '@house-hunter/data-model'
import { i18n } from '@/i18n'
// App
import { useDiscoveryTasksStore } from '@/stores/discovery-tasks'
import { useToastsStore } from '@/stores/toasts'

export function onMessage (message: T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended): void {
  const { t } = i18n.global
  const { task } = message.payload.execution
  const result = message.payload.result

  const type = result.outcome === 'success' ? 'success' : 'danger'
  const title = result.outcome === 'success'
    ? t('toasts.discoveryAdsTaskSuccess.title')
    : t('toasts.discoveryAdsTaskError.title')

  const messages = result.outcome === 'success'
    ? [t('toasts.discoveryAdsTaskSuccess.message', { target: task.target.toUpperCase() })]
    : [
      t('toasts.discoveryAdsTaskError.message', { source: task.target.toUpperCase() }),
      result.error?.details ?? ''
    ]

  useDiscoveryTasksStore().setLastTaskExecution(message.payload)
  useToastsStore().launch({ messages, title, type })
}
