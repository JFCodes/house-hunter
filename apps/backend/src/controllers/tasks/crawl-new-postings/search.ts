import type { T_API_RESPONSE_TasksCrawlNewPostingsSearch } from '@house-hunter/types'
import type { Request, Response } from 'express'
// App
import { InactiveTasksData, ActiveTasksData } from '../../../data'

export function controller(_: Request, res: Response<T_API_RESPONSE_TasksCrawlNewPostingsSearch>) {
  // const inactive = filterWithStatus(InactiveTasksData.data, false)
  // const active = filterWithStatus(ActiveTasksData.data, true)
  
  // res.status(200).json([...active, ...inactive])
  res.status(200).json([])
}
