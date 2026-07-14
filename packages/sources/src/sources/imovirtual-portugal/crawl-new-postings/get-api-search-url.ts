import type { T_TaskCrawlNewPostings, T_PostingOperation, T_PostingType } from '@house-hunter/types'
// App
import { BASE_API_URL } from '../_constants'

// https://www.imovirtual.com/_next/data/ImwbPD8wT2LK6qTdNXFnv/pt/resultados/comprar/moradia/leiria/leiria.json?limit=72&page=3&searchingCriteria=comprar&searchingCriteria=moradia&searchingCriteria=leiria&searchingCriteria=leiria

type Options = {
  pageNumber: number
  buildId: string
}

export function getApiSearchUrl (task: T_TaskCrawlNewPostings, options: Options): string {
  const { buildId, pageNumber } = options
  const postingOperation = getPostingOperationSegment(task.options.postingOperation)
  const postingType = getPostingTypesSegment(task.options.postingTypes)

  let url = BASE_API_URL
  url += '/_next/data'
  url += `/${buildId}`
  url += '/pt/resultados'
  url += `/${postingOperation}`
  url += `/${postingType}`
  url += `/${task.options.location}.json`
  url += '?limit=72'
  url += `&page=${pageNumber}`
  url += `&searchingCriteria=${postingOperation}`
  url += `&searchingCriteria=${postingType}`
  url += task.options.location.split('/').map(l => `&searchingCriteria=${l}`).join('')

  return url
}


function getPostingOperationSegment (operation: T_PostingOperation): string {
  switch (operation) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getPostingTypesSegment (types: Array<T_PostingType>): string {
  if (types.length === 0) throw new Error('Imovirtual requires one posting type segment')

  const mapTypology = (typology: T_PostingType): string => {
    switch (typology) {
      case 'single-home': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}
