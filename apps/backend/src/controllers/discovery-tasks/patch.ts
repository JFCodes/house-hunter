import {
  DiscoveryTaskSchema,
  type T_API_RESPONSE_DiscoveryTask,
  type T_DiscoveryTask,
} from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../database/database'
import { eq } from 'drizzle-orm'

export async function controller(req: Request, res: Response<T_API_RESPONSE_DiscoveryTask>) {
  const taskId = req.params.taskId
  if (typeof taskId !== 'string' || !taskId) return res.sendStatus(400)

  const task = await db.select().from(DiscoveryTaskSchema).where(eq(DiscoveryTaskSchema.id, taskId))
  if (!task) return res.sendStatus(404)

  const patchFields = req.body
  if (typeof patchFields !== 'object' || Array.isArray(patchFields)) return res.sendStatus(400)


  const updatedRecord: T_DiscoveryTask = {
    ...task,
    ...patchFields,
  }

  const updated = await db
    .update(DiscoveryTaskSchema)
    .set(updatedRecord)
    .where(eq(DiscoveryTaskSchema.id, taskId))
    .returning()

  res.status(200).json(updated[0])
}
