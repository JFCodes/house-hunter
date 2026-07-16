import { AdSchema, DiscoveryTaskSchema, E_TARGET } from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../database/database'
import { DiscoveryTasksQueue } from '../queues'

export async function controller(_: Request, res: Response) {
  const discoveryTasks = db.select().from(DiscoveryTaskSchema).all()
  const task = discoveryTasks[1]
  const ads = db.select().from(AdSchema).all()

  // if (task) {
  //   DiscoveryTasksQueue.queueTask(task, 0)
  // }

  // await db.insert(DiscoveryTaskSchema).values({
  //   target: E_TARGET.REMAX_PORTUGAL,
  //   options: {
  //     buildingTypes: ['single-house'],
  //     location: 'leiria/leiria/r',
  //     addType: 'buy',
  //   }
  // })

  // await db.insert(DiscoveryTaskSchema).values({
  //   target: E_TARGET.IMOVIRTUAL_PORTUGAL,
  //   options: {
  //     buildingTypes: ['single-house'],
  //     location: 'leiria/leiria',
  //     addType: 'buy',
  //   }
  // })

  return res.sendStatus(200)
}
