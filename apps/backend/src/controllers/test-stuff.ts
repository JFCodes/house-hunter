import { AdSchema, DiscoveryTaskSchema, E_TARGET } from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../database/database'
import { DiscoveryTasksQueue } from '../queues'

export async function controller(_: Request, res: Response) {
  const discoveryTasks = db.select().from(DiscoveryTaskSchema).all()
  const ads = db.select().from(AdSchema).all()

  // if (discoveryTasks[0]) DiscoveryTasksQueue.queueTask(discoveryTasks[0], 0)
  // if (discoveryTasks[1]) DiscoveryTasksQueue.queueTask(discoveryTasks[1], 0)

  return res.sendStatus(200)
}
