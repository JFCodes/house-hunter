import { SOURCES_MAP } from '@house-hunter/sources'
import {
  E_TASK_TYPE, Err_TaskExecution,
  type T_TaskExecutionResult,
  type T_TaskExecution,
  T_TaskExecutionOutcome,
} from '@house-hunter/types'

export async function ExecuteTask (execution: T_TaskExecution): Promise<T_TaskExecutionResult> {
  const source = SOURCES_MAP[execution.task.source]
  const returnWithOutcome = (outcome: T_TaskExecutionOutcome): T_TaskExecutionResult => ({ outcome, postings: [] })

  if (!source) return returnWithOutcome('error-invalid-task-source')

  try {
    switch (execution.task.type) {
      case E_TASK_TYPE.CRAWL_NEW_POSTINGS: return await source.crawlNewPostings(execution.task)
      case E_TASK_TYPE.UPDATED_POSTING: return await source.updatePosting(execution.task)
      default: return returnWithOutcome('error-invalid-task-type')
    }
  } catch(error: unknown) {
    if (error instanceof Err_TaskExecution) return { outcome: error.outcome, error, postings: [] }
    return returnWithOutcome('error-unknown')
  }
}
