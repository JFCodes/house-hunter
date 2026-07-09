import type { T_Posting } from '@house-hunter/types'
// App
import { Data } from './_instance'

export const data = new Data<T_Posting>({
  fileName: 'postings',
  fallback: [],
})
