import type { T_EngineEvent, T_EngineEventExecution } from '@house-hunter/types'
import { E_ENGINE_SOURCES, E_ENGINE_TASKS } from '@house-hunter/types'

// Sources
// Idealista
import { crawl as IdealistaCrawlNewPostings } from './idealista-portugal/crawl-new-postings'
import { crawl as IdealistaUpdatePosting } from './idealista-portugal/update-posting'
// Remax
import { crawl as RemaxCrawlNewPostings } from './remax-portugal/crawl-new-postings'
import { crawl as RemaxUpdatePosting } from './remax-portugal/update-posting'

type CrawlFunction = (event: T_EngineEvent<any>) => Promise<T_EngineEventExecution>
type TaskMap = Record<E_ENGINE_TASKS, CrawlFunction>
type SourceTaskMap = Record<E_ENGINE_SOURCES, TaskMap>

export const SOURCE_TASK_MAP: SourceTaskMap = {
  [E_ENGINE_SOURCES.IDEALISTA_PORTUGAL]: {
    [E_ENGINE_TASKS.CRAWL_NEW_POSTINGS]: IdealistaCrawlNewPostings,
    [E_ENGINE_TASKS.UPDATE_POSTING]: IdealistaUpdatePosting,
  },
  [E_ENGINE_SOURCES.REMAX_PORTUGAL]: {
    [E_ENGINE_TASKS.CRAWL_NEW_POSTINGS]: RemaxCrawlNewPostings,
    [E_ENGINE_TASKS.UPDATE_POSTING]: RemaxUpdatePosting,
  },
}
