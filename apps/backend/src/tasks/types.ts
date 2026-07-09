import type { T_TaskExecution } from '@house-hunter/types'

export type QueueTaskExecution = {
  taskExecution: T_TaskExecution
  attempt: number
  id: string
}
