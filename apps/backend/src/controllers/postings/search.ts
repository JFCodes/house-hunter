import type { T_API_RESPONSE_PostingsSearch } from '@house-hunter/types'
import type { Request, Response } from 'express'
// App
import { PostingsData } from '../../data'

export function controller(_: Request, res: Response<T_API_RESPONSE_PostingsSearch>) {
  res.status(200).json(PostingsData.data)
}
