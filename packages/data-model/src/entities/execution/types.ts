import type { Err_TaskExecution } from '../error-interfaces'
import type { T_AdNew } from '../ad'

export type T_ExecutionResultOutcome =
  | 'error-invalid-task-arguments'
  | 'error-invalid-task-target'
  | 'error-during-execution'
  | 'error-invalid-task'
  | 'error-unknown'
  | 'success'

export type T_ExecutionResult = {
  outcome: T_ExecutionResultOutcome
  error?: Err_TaskExecution
  data: {
    upsert: Array<T_AdNew>
  }
}

export type T_Execution<Task> = {
  result: null | T_ExecutionResult
  registeredAt: null | number
  startedAt: null | number
  duration: null | number
  endedAt: null | number
  maxRetries: number
  task: Task
}
