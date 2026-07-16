import { SOURCES_MAP } from '@house-hunter/sources'
import {
  type T_ExecutionResultOutcome,
  type T_ExecutionResult,
  type T_DiscoveryTask,
  type T_Execution,
  Err_TaskExecution,
} from '@house-hunter/data-model'

export async function ExecuteTask (execution: T_Execution<T_DiscoveryTask>): Promise<T_ExecutionResult> {
  const target = SOURCES_MAP[execution.task.target]
  const returnWithOutcome = (outcome: T_ExecutionResultOutcome): T_ExecutionResult => ({
    data: { upsert: [] },
    outcome,
  })

  if (!target) return returnWithOutcome('error-invalid-task-target')
    
  try {
    return await target.discover(execution.task)
  } catch(error: unknown) {
    if (error instanceof Err_TaskExecution) {
      return {
        outcome: error.outcome,
        data: { upsert: [] },
        error,
      }
    }

    return returnWithOutcome('error-unknown')
  } 
}
