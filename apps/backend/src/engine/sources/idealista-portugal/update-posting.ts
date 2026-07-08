import { T_EngineEvent, T_EngineEventExecution } from '@house-hunter/types'

export async function crawl(event: T_EngineEvent): Promise<T_EngineEventExecution> {
  console.log({ event })
  return {
    outcome: 'success'
  }
}