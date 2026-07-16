import {
  AdSchema,
  type T_API_RESPONSE_Ad,
  type T_Ad,
} from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../database/database'
import { eq } from 'drizzle-orm'

export async function controller(req: Request, res: Response<T_API_RESPONSE_Ad>) {
  const adId = req.params.adId
  if (typeof adId !== 'string' || !adId) return res.sendStatus(400)

  const ad = await db.select().from(AdSchema).where(eq(AdSchema.id, adId))
  if (!ad) return res.sendStatus(404)

  const patchFields = req.body
  if (typeof patchFields !== 'object' || Array.isArray(patchFields)) return res.sendStatus(400)

  const updatedRecord: T_Ad = {
    ...ad,
    ...patchFields,
  }

  const updated = await db
    .update(AdSchema)
    .set(patchFields)
    .where(eq(AdSchema.id, adId))
    .returning()

  res.status(200).json(updated[0])
}
