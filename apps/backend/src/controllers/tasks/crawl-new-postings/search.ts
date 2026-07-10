import { E_TASK_TYPE, type T_API_RESPONSE_TasksCrawlNewPostingsSearch, type T_Task, type T_TaskCrawlNewPostingsWithStatus } from '@house-hunter/types'
import type { Request, Response } from 'express'
// App
import { InactiveTasksData, ActiveTasksData } from '../../../data'

const filterWithStatus = (list: Array<T_Task>, isActive: boolean): Array<T_TaskCrawlNewPostingsWithStatus> => {
  return list
    .filter(t => t.type === E_TASK_TYPE.CRAWL_NEW_POSTINGS)
    .map(t => ({ ...t, isActive }))
}

export function controller(_: Request, res: Response<T_API_RESPONSE_TasksCrawlNewPostingsSearch>) {
  const inactive = filterWithStatus(InactiveTasksData.data, false)
  const active = filterWithStatus(ActiveTasksData.data, true)
  
  res.status(200).json([...active, ...inactive])
}
