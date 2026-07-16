import {} from '../'

export enum E_TASK_TYPE {
  CRAWL_NEW_POSTINGS = 'crawl-new-postings',
  UPDATED_POSTING = 'update-posting',
}

export enum E_TASK_STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DELETE = 'deleted',
}

export enum E_TASK_SOURCE {
  IMOVIRTUAL_PORTUGAL = 'imovirtual-portugal',
  IDEALISTA_PORTUGAL = 'idealista-portugal',
  REMAX_PORTUGAL = 'remax-portugal',
}

export type T_BaseTask<T extends E_TASK_TYPE> = {
  source: E_TASK_SOURCE
  status: E_TASK_STATUS
  isRunning: boolean
  createdAt: number
  id: string
  type: T
}
