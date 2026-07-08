import { T_EngineEvent, T_EngineEventExecutionOutcome } from '@house-hunter/types'
// App
import { SOURCE_TASK_MAP } from './sources'

export type ExecutionError = {
  outcome: T_EngineEventExecutionOutcome,
  details: string
}

const parseExecutionError = (error: unknown): null | ExecutionError => {
  if (!error) return null
  if (typeof error !== 'object') return null
  if (Array.isArray(error)) return null

  if (!('outcome' in error)) return null
  if (typeof error.outcome !== 'string') return null

  if (!('details' in error)) return null
  if (typeof error.details !== 'string') return null

  return error as ExecutionError
}

export async function ExecuteEvent (event: T_EngineEvent<{}>): Promise<boolean> {
  const crawler = SOURCE_TASK_MAP[event.source][event.task]

  const result: T_EngineEventExecutionOutcome = await crawler(event)
    .then(result => result.outcome)
    .catch((error: unknown) => {
      console.log('ExecuteEvent', { error })
      const executionError = parseExecutionError(error)
      return executionError?.outcome ?? 'error-unknown'
    })

  return result === 'success'
}
