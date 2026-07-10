import { T_Task } from '@house-hunter/types'
// App
import { Data } from './_instance'

export const data = new Data<T_Task>({
  fileName: 'inactive-tasks',
  fallback: [],
})
