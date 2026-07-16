import type { T_ExecutionResultOutcome } from './execution'
import type { T_DiscoveryTask } from './discover-task'

export enum E_ERROR_TYPES {
  EXECUTION_ERROR = 'execution-error'
}

export class Err_TaskExecution extends Error {
  errorType: E_ERROR_TYPES
  message: string

  constructor(
    public readonly outcome: T_ExecutionResultOutcome,
    public readonly task: T_DiscoveryTask,
    public readonly details: string,
  ) {

    const errorMessage = `[${task.entityTye}][${task.target.toUpperCase()}]: ${details}`
    super(errorMessage)

    this.errorType= E_ERROR_TYPES.EXECUTION_ERROR
    this.name = E_ERROR_TYPES.EXECUTION_ERROR
    this.message = errorMessage
  }
}