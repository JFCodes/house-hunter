import type {
  T_TaskCrawlNewPostings,
  T_TaskExecutionResult,
  T_TaskUpdatePosting,
} from '@house-hunter/types'

export interface Source {
  crawlNewPostings: (task: T_TaskCrawlNewPostings) => Promise<T_TaskExecutionResult>
  updatePosting: (task: T_TaskUpdatePosting) => Promise<T_TaskExecutionResult>
}
