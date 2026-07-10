import { T_TaskCrawlNewPostingsWithStatus } from '../entities/task'

export type T_API_RESPONSE_Ping = { status: 'ok' }

export type T_API_RESPONSE_TasksCrawlNewPostingsSearch = Array<T_TaskCrawlNewPostingsWithStatus>
