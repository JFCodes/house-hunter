import type { T_API_RESPONSE_Ping } from '@house-hunter/data-model'
import type { Request, Response } from 'express'

export function controller(_: Request, res: Response<T_API_RESPONSE_Ping>) {
  res.status(200).json({ status: 'ok' })
}
