import type { T_TaskCrawlNewPostings, T_TaskExecutionResult, T_TaskUpdatePosting } from '@house-hunter/types'
import type { Source } from '../types/source-interface'

class SourceClass implements Source {

  async updatePosting (task: T_TaskUpdatePosting): Promise<T_TaskExecutionResult>  {
    console.log('IdealistaPortugalSource:updatePosting')
    return { outcome: 'success', postings: [] }
  }

  async crawlNewPostings (task: T_TaskCrawlNewPostings): Promise<T_TaskExecutionResult>  {
    console.log('IdealistaPortugalSource:crawlNewPostings')
    return { outcome: 'success', postings: [] }
  }
}

export const IdealistaPortugalSource = new SourceClass()