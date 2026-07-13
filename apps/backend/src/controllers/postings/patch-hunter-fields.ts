import type { T_API_RESPONSE_Posting, T_Posting } from '@house-hunter/types'
import type { Request, Response } from 'express'
// App
import { PostingsData } from '../../data'

export function controller(req: Request, res: Response<T_API_RESPONSE_Posting>) {
  const postingId = req.params.postingId
  if (typeof postingId !== 'string' || !postingId) return res.sendStatus(400)

  const posting = PostingsData.getRecord(postingId)
  if (!posting) return res.sendStatus(404)

  const patchFields = req.body
  if (typeof patchFields !== 'object' || Array.isArray(patchFields)) return res.sendStatus(400)

  const updatedRecord: T_Posting = {
    ...posting,
    _houseHunterFields: {
      ...posting._houseHunterFields,
      ...patchFields
    }
  }

  PostingsData.updateRecord(updatedRecord)
  res.status(200).json(updatedRecord)
}
