import type { Request, Response } from 'express'
import type { T_API_RESPONSE_Ping } from '@house-hunter/types'

export function controller(_: Request, res: Response<T_API_RESPONSE_Ping>) {
  // res.status(500).end()
  res.status(200).json({ status: 'ok' })
}
