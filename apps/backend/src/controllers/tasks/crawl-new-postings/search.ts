import type { T_API_RESPONSE_DiscoveryTasks } from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App

export function controller(_: Request, res: Response<T_API_RESPONSE_DiscoveryTasks>) {
  // TODO
  res.status(200).json([])
}
