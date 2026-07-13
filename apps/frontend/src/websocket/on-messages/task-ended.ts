import type { T_API_WEBSOCKET_ServerMessage_TaskEnded } from '@house-hunter/types'
import { i18n } from '@/i18n'
// App
import { useToastsStore } from '@/stores/toasts'
import { useTasksStore } from '@/stores/tasks'

export function onMessage (message: T_API_WEBSOCKET_ServerMessage_TaskEnded): void {
  const { t } = i18n.global
  const { task } = message.payload.task
  const result = message.payload.result
  const taskType = t(`enums.taskType.${task.type}`)

  console.log({ result })

  const type = result.outcome === 'success' ? 'success' : 'danger'
  const title = result.outcome === 'success'
    ? t('toasts.taskEndedSuccess.title')
    : t('toasts.taskEndedError.title')

  const messages = result.outcome === 'success'
    ? [t('toasts.taskEndedSuccess.message', { source: task.source.toUpperCase(), type: taskType })]
    : [
      t('toasts.taskEndedError.message', { source: task.source.toUpperCase(), type: taskType }),
      result.error?.details ?? ''
    ]

  useTasksStore().setLastTaskExecution(message.payload.task, message.payload.result)
  useToastsStore().launch({ messages, title, type })
}
