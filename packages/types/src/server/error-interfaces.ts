import type { T_TASK_CrawlNewPostings, T_TASK_UpdatePost } from '../entities/tasks'
import type { T_TaskExecutionOutcome } from './task-execution'

export enum E_ERROR_TYPES {
  TASK_EXECUTION_ERROR = 'task-execution-error'
}

export class Err_TaskExecution extends Error {
  errorType: E_ERROR_TYPES
  message: string

  constructor(
    public readonly task: T_TASK_CrawlNewPostings | T_TASK_UpdatePost,
    public readonly outcome: T_TaskExecutionOutcome,
    public readonly details: string,
  ) {

    const errorMessage = `[${task.source.toUpperCase()}][${task.type.toUpperCase()}]: ${details}`
    super(errorMessage)

    this.errorType= E_ERROR_TYPES.TASK_EXECUTION_ERROR
    this.name = E_ERROR_TYPES.TASK_EXECUTION_ERROR
    this.message = errorMessage
  }
}