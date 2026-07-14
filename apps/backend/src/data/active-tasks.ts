import { E_TASK_SOURCE, E_TASK_TYPE, T_Task } from '@house-hunter/types'
// App
import { Data } from './_instance'

export const data = new Data<T_Task>({
  fileName: 'active-tasks',
  fallback: [],
})

// data.addRecord({
//   type: E_TASK_TYPE.CRAWL_NEW_POSTINGS,
//   source: E_TASK_SOURCE.IMOVIRTUAL_PORTUGAL,
//   createdAt: new Date().getTime(),
//   id: crypto.randomUUID(),
//   options: {
//     postingTypes: ['single-home'],
//     postingOperation: 'buy',
//     location: 'leiria/leiria'
//   }
// })
