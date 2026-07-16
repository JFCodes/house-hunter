import { T_TASK_CrawlNewPostings } from './crawl-new-posts'
import { T_TASK_UpdatePost } from './update-post'

export * from './_base'
export * from './crawl-new-posts'
export * from './update-post'

export type T_AnyTask =
  | T_TASK_CrawlNewPostings
  | T_TASK_UpdatePost
