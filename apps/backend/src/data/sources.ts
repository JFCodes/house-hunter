import type { T_Source } from '@house-hunter/types'
// App
import { Data } from './_instance'

export const data = new Data<T_Source>({
  fileName: 'sources',
  fallback: [],
})
