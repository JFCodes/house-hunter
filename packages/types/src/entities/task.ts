import type { T_PostingOperation, T_PostingType } from './posting'

export enum E_TASK_TYPE {
  CRAWL_NEW_POSTINGS = 'crawl-new-postings',
  UPDATED_POSTING = 'update-posting',
}

export enum E_TASK_SOURCE {
  IDEALISTA_PORTUGAL = 'idealista-portugal',
  REMAX_PORTUGAL = 'remax-portugal',
}

type T_BaseTask<T extends E_TASK_TYPE> = {
  source: E_TASK_SOURCE
  createdAt: number
  id: string
  type: T
}

export type T_TaskCrawlNewPostings =
  T_BaseTask<E_TASK_TYPE.CRAWL_NEW_POSTINGS>
  & {
    options: {
      postingOperation: T_PostingOperation
      postingTypes: Array<T_PostingType>
      location: string 
    }
  }

export type T_TaskUpdatePosting =
  T_BaseTask<E_TASK_TYPE.UPDATED_POSTING>
  & {
    options: {}
  }

export type T_Task =
  | T_TaskCrawlNewPostings
  | T_TaskUpdatePosting
