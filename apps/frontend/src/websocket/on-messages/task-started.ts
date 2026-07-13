import type { T_API_WEBSOCKET_ServerMessage_TaskStarted } from '@house-hunter/types'
import { i18n } from '@/i18n'
// App
import { useToastsStore } from '@/stores/toasts'
import { useTasksStore } from '@/stores/tasks'

export function onMessage (message: T_API_WEBSOCKET_ServerMessage_TaskStarted): void {
  const { t } = i18n.global
  const { task } = message.payload.task
  const taskType = t(`enums.taskType.${task.type}`)

  useTasksStore().setActiveTaskExecution(message.payload.task)
  useToastsStore().launch({
    type: 'success',
    title: t('toasts.taskStarted.title'),
    messages: [
      t('toasts.taskStarted.message', { source: task.source.toUpperCase(), type: taskType })
    ]
  })
}
