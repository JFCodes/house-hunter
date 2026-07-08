import { T_EngineEvent } from '@house-hunter/types'
// App
import { SOURCE_TASK_MAP } from './sources'

export async function ExecuteEvent (event: T_EngineEvent<{}>): Promise<boolean> {
  const crawler = SOURCE_TASK_MAP[event.source][event.task]

  const result = await crawler(event)
  return result.outcome === 'success'
}
