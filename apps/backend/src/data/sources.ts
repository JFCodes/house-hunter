import { E_ENGINE_SOURCES, E_ENGINE_TASKS, type T_Source } from '@house-hunter/types'
// App
import { Data } from './_instance'

export const data = new Data<T_Source>({
  fileName: 'sources',
  fallback: [],
})

// data.addRecord({
//   id: crypto.randomUUID(),
//   source: E_ENGINE_SOURCES.REMAX_PORTUGAL,
//   task: E_ENGINE_TASKS.CRAWL_NEW_POSTINGS,
//   options: {
//     location: 'Leiria',
//     postingType: 'rent'
//   }
// })

// data.updateRecord({
//   id: '5ef6cffb-cb59-4abf-b5fa-ff260004864a',
//   options: {
//     typologies: ['apartment'],
//     location: 'Leiria',
//     postingType: 'rent',
//   }
// })
