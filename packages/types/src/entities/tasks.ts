import { T_TASK_CrawlNewPostings } from './tasks/crawl-new-posts'
import { T_TASK_UpdatePost } from './tasks/update-post'

export * from './tasks/crawl-new-posts'
export * from './tasks/update-post'
export * from './tasks/_base'

export type T_AnyTask =
  | T_TASK_CrawlNewPostings
  | T_TASK_UpdatePost
