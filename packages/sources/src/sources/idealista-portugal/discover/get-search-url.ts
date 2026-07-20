import { T_DiscoveryTask, T_AdType, T_AdBuildingType } from '@house-hunter/data-model'
// App
import { BASE_URL } from '../_constants'

export function getSearchUrl (task: T_DiscoveryTask): string {

  let url = BASE_URL
  url += `/${getAdOperationSegment(task.options.addType)}`
  url += `/${task.options.location}`
  
  const buildingTypeSegment = getAdBuildingType(task.options.buildingTypes)
  if (buildingTypeSegment) url += `/${buildingTypeSegment}`

  return url
}

function getAdOperationSegment (operation: T_AdType): string {
  switch (operation) {
    case 'rent': return 'arrendar-casas'
    case 'buy': return 'comprar-casas'
  }
}

function getAdBuildingType (types: Array<T_AdBuildingType>): null | string {
  if (types.length === 0) return null

  switch (types[0]) {
    case 'single-house': return 'com-moradias'
    case 'apartment': return 'com-apartamentos'
  }
}