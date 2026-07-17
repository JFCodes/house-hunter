import type { Request, Response } from 'express'
import { DiscoveryTaskSchema } from '@house-hunter/data-model'
// App
import { DiscoveryTasksQueue } from '../../queues/discovery-task'
import { db } from '../../database/database'
import { eq } from 'drizzle-orm'

export function controller(req: Request, res: Response) {
  const taskId = req.params.taskId
  if (typeof taskId !=='string' || !taskId) return res.sendStatus(400)

  const tasks = db
    .select()
    .from(DiscoveryTaskSchema)
    .where(eq(DiscoveryTaskSchema.id, taskId))
    .all()

  const task = tasks[0]
  if (!task) return res.sendStatus(404)

  DiscoveryTasksQueue.queueTask(task, 1)

  res.status(200).end()
}
