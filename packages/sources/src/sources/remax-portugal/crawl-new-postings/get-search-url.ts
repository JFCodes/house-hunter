import { T_TaskCrawlNewPostings, T_PostingOperation, T_PostingType } from '@house-hunter/types'
// App
import { BASE_URL } from '../_constants'

export function getSearchUrl (task: T_TaskCrawlNewPostings): string {
  const operationSegment = getPostingOperationSegment(task.options.postingOperation)

  let url = BASE_URL
  url += `/${getPostingOperationSegment(task.options.postingOperation)}`
  url += '/imoveis'
  url += `/${getPostingTypesSegment(task.options.postingTypes)}`
  if (task.options.location) url += `/${task.options.location}`

  return url
}

function getPostingOperationSegment (operation: T_PostingOperation): string {
  switch (operation) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getPostingTypesSegment (types: Array<T_PostingType>): string {
  if (types.length === 0) return `habitacao`

  const mapTypology = (typology: T_PostingType): string => {
    switch (typology) {
      case 'single-home': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}