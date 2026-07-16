import { T_AdNew } from '../entities'

export type T_API_Pagination = {
  page: number
  size: number
}

export type T_API_PAYLOAD_PatchAd = Partial<T_AdNew> & { id: string }
