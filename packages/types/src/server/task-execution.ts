import type { Err_TaskExecution } from './error-interfaces'
import type { T_Posting, T_AnyTask } from '../entities'

export type T_TaskExecutionOutcome =
  | 'error-invalid-task-source'
  | 'error-invalid-task-type'
  | 'error-execution'
  | 'error-arguments'
  | 'error-unknown'
  | 'success'

export type T_TaskExecution = {
  maxRetries: number
  startedAt: number
  endedAt: number
  task: T_AnyTask
}

export type T_TaskExecutionResult = {
  outcome: T_TaskExecutionOutcome
  error?: Err_TaskExecution
  // TODO: entities to updated, etc...
  postings: Array<T_Posting>
}

