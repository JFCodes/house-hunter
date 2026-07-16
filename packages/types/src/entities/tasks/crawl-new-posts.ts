import type { T_PostingOperation, T_PostingType } from '../posting'
import { E_TASK_TYPE, type T_BaseTask } from './_base'

export type T_TASK_CrawlNewPostings =
  T_BaseTask<E_TASK_TYPE.CRAWL_NEW_POSTINGS>
  & {
    options: {
      postingOperation: T_PostingOperation
      postingTypes: Array<T_PostingType>
      location: string 
    }    
  }

export type T_TASK_CrawlNewPostings_New =
  Pick<T_TASK_CrawlNewPostings, 'source' | 'options'>
