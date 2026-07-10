import { T_TaskExecutionResult } from '@house-hunter/types'
// App
import { PostingsData } from '../data'

export function ProcessExecutionResult (result: T_TaskExecutionResult): void {
  if (result.outcome !== 'success') return

  // Add or update postings
  if (result.postings.length > 0) PostingsData.batchUpsert(result.postings)
}
