import { type T_API_RESPONSE_DiscoveryTasks, DiscoveryTaskSchema } from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../database/database'

// TODO: actual pagination
export function controller(_: Request, res: Response<T_API_RESPONSE_DiscoveryTasks>) {
  const tasks = db.select().from(DiscoveryTaskSchema).all()
  res.status(200).json(tasks)
}
