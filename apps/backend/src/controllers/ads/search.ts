import {
  type T_API_RESPONSE_AdSearch,
  type T_API_Paginated,
  type T_Ad,
  AdSchema
} from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App
import { db } from '../../database/database'

export function controller(_: Request, res: Response<T_API_RESPONSE_AdSearch>) {
  const data = db.select().from(AdSchema).all()
  const result: T_API_Paginated<T_Ad> = {
    total: data.length,
    size: data.length,
    page: 1,
    data
  }
  res.status(200).json(result)
}
