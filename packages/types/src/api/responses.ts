import { T_Posting } from '../entities'
import { T_TASK_CrawlNewPostings } from '../entities/tasks'

export type T_API_RESPONSE_TasksCrawlNewPostingsSearch = Array<T_TASK_CrawlNewPostings>
export type T_API_RESPONSE_PostingsSearch = Array<T_Posting>
export type T_API_RESPONSE_Ping = { status: 'ok' }
export type T_API_RESPONSE_Posting = T_Posting
