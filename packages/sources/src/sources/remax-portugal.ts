import type { T_TaskCrawlNewPostings, T_TaskExecutionResult, T_TaskUpdatePosting } from '@house-hunter/types'
// App
import type { Source } from '../types/source-interface'
import { crawl as CrawlNewPostings } from './remax-portugal/crawl-new-postings'

class SourceClass implements Source {

  async updatePosting (task: T_TaskUpdatePosting): Promise<T_TaskExecutionResult>  {
    console.log('RemaxPortugalSource:updatePosting')

    return { outcome: 'success', postings: [] }
  }

  async crawlNewPostings (task: T_TaskCrawlNewPostings): Promise<T_TaskExecutionResult>  {
    return CrawlNewPostings(task)
  }
}

export const RemaxPortugalSource = new SourceClass()