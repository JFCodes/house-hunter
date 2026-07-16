import type { T_API_RESPONSE_AdSearch } from '@house-hunter/data-model'
import type { Request, Response } from 'express'
// App

export function controller(_: Request, res: Response<T_API_RESPONSE_AdSearch>) {
  // TODO:
  res.sendStatus(500)
}
