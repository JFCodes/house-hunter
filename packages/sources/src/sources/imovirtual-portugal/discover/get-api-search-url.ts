import type { T_AdBuildingType, T_DiscoveryTask, T_AdType } from '@house-hunter/data-model'
// App
import { BASE_API_URL } from '../_constants'

// https://www.imovirtual.com/_next/data/ImwbPD8wT2LK6qTdNXFnv/pt/resultados/comprar/moradia/leiria/leiria.json?limit=72&page=3&searchingCriteria=comprar&searchingCriteria=moradia&searchingCriteria=leiria&searchingCriteria=leiria

type Options = {
  pageNumber: number
  buildId: string
}

export function getApiSearchUrl (task: T_DiscoveryTask, options: Options): string {
  const { buildId, pageNumber } = options
  const postingOperation = getAddTypeSegment(task.options.addType)
  const postingType = getAddBuildingTypeSegment(task.options.buildingTypes)

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


function getAddTypeSegment (addType: T_AdType): string {
  switch (addType) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getAddBuildingTypeSegment (types: Array<T_AdBuildingType>): string {
  if (types.length === 0) throw new Error('Imovirtual requires one posting type segment')

  const mapTypology = (typology: T_AdBuildingType): string => {
    switch (typology) {
      case 'single-house': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}
